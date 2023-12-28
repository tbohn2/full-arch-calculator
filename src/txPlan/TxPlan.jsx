import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import myDentalLogo from '../assets/myDentalLogo.png';

const FinalTxPlan = (tx, totals) => {
    const { treatmentPlanningTotal, maxTotal, mandTotal, total } = totals;

    const sedationArray = [
        { id: 6, name: "Halcion Sedation", cost: 450 },
        { id: 7, name: "IV Sedation*", cost: 1200 }
    ]

    const hygieneVisitsArray = [
        { id: 32, name: "1 Years", cost: 0 },
        { id: 33, name: "2 Years", cost: 300 },
        { id: 34, name: "3 Years", cost: 500 },
        { id: 35, name: "4 Years", cost: 650 },
        { id: 36, name: "5 Years", cost: 750 },
    ]

    const warrantyArray = [
        { id: 37, name: "2 Years", cost: 0 },
        { id: 38, name: "3 Years", cost: 750 },
        { id: 39, name: "4 Years", cost: 1400 },
        { id: 40, name: "5 Years", cost: 2000 },
        { id: 41, name: "Lifetime", cost: 3500 }
    ]

    const constantArrays = [sedationArray, hygieneVisitsArray, warrantyArray]

    const { TxPlan, maxTxPlan, mandTxPlan } = tx;
    let finalTreatmentPlan = []
    let finalMaxTxPlan = []
    let finalMandTxPlan = []

    const organizeTxPlan = (txArray, arch) => {
        for (let i = 0; i < txArray.length; i++) {
            let id = txArray[i].id
            let name = txArray[i].name
            let cost = txArray[i].cost
            if (id >= 1 && id <= 4) { finalTreatmentPlan.push(txArray[i]) }
            if (id >= 9 && id <= 11) {
                if (arch === 'max') {
                    name = `Upper Teeth Removal: ${name}`
                    finalMaxTxPlan.push({ id, name, cost })
                } else {
                    name = `Lower Teeth Removal: ${name}`
                    finalMandTxPlan.push({ id, name, cost })
                }
            }
            if (id >= 13 && id <= 15) {
                if (arch === 'max') {
                    name = `Upper Foundational Work: ${name}`
                    finalMaxTxPlan.push({ id, name, cost })
                } else {
                    name = `Lower Foundational Work: ${name}`
                    finalMandTxPlan.push({ id, name, cost })
                }
            }
            if (id >= 17 && id <= 18) {
                if (arch === 'max') {
                    name = `Upper ${name}`;
                    finalMaxTxPlan.push({ id, name, cost })
                } else {
                    name = `Lower ${name}`;
                    finalMandTxPlan.push({ id, name, cost })
                }
            }
            if (id >= 20 && id <= 23) {
                if (arch === 'max') {
                    name = `Upper Implants: ${name}`;
                    finalMaxTxPlan.push({ id, name, cost })
                } else {
                    name = `Lower Implants: ${name}`;
                    finalMandTxPlan.push({ id, name, cost })
                }
            }
            if (id >= 24 && id <= 27) {
                if (arch === 'max') {
                    name = `Upper Abutments: ${name}`;
                    finalMaxTxPlan.push({ id, name, cost })
                } else {
                    name = `Lower Abutments: ${name}`;
                    finalMandTxPlan.push({ id, name, cost })
                }
            }
            if (id >= 28 && id <= 31) {
                if (arch === 'max') {
                    name = `Upper Final: ${name}`;
                    finalMaxTxPlan.push({ id, name, cost })
                } else {
                    name = `Lower Final: ${name}`;
                    finalMandTxPlan.push({ id, name, cost })
                }
            }
        }
        txArray.sort((a, b) => {
            const idA = parseInt(a.id.slice(-2));
            const idB = parseInt(b.id.slice(-2));
            return idA - idB;
        });
    }


    organizeTxPlan(TxPlan);
    organizeTxPlan(maxTxPlan, 'max');
    organizeTxPlan(mandTxPlan, 'mand');

    const archesArray = [finalMaxTxPlan, finalMandTxPlan]

    const txPlan1Ref = useRef(null);
    const txPlan2Ref = useRef(null);
    const txPlan3Ref = useRef(null);

    const generatePdf = async () => {
        const pdfDocument = new jsPDF({ unit: 'in' });
        const canvasArray = [txPlan1Ref, txPlan2Ref, txPlan3Ref]

        for (let i = 0; i < canvasArray.length; i++) {
            const canvas = await html2canvas(canvasArray[i].current);
            const aspectRatio = canvas.width / canvas.height;
            const image1 = canvas.toDataURL('image/jpeg', 0.2)
            pdfDocument.addImage(image1, 'JPEG', 0, 0.5, 8, (8 / aspectRatio));
            if (i < canvasArray.length - 1) { pdfDocument.addPage() }
        }

        pdfDocument.save('TxPlan.pdf');
    };
    return (
        <div>
            {archesArray.map((arch) => {
                let ref, title, total
                if (arch === finalMaxTxPlan) { ref = txPlan1Ref, title = 'Upper', total = maxTotal }
                if (arch === finalMandTxPlan) { ref = txPlan2Ref, title = 'Lower', total = mandTotal }
                return (
                    <div ref={ref} className="full-page col-12 d-flex flex-column align-items-center">
                        <img src={myDentalLogo} alt="My Dental Logo" className='logo' />
                        <h1>Treatment Plan For {title}</h1>
                        {arch.map((tx) => {
                            return (
                                <div key={tx.id} className='col-6 d-flex justify-content-between'>
                                    <p className='fs-5'>{tx.name}</p>
                                    <p className='fs-5'>${tx.cost}</p>
                                </div>
                            )
                        })}
                        <div className='col-6 d-flex justify-content-between'>
                            <h3>Total</h3>
                            <h3>${total}</h3>
                        </div>
                    </div>
                )
            })}
            <div className='d-flex flex-column'>
                <div ref={txPlan3Ref} className="full-page col-12 d-flex flex-column align-items-center">
                    <img src={myDentalLogo} alt="My Dental Logo" className='logo' />
                    <h2>Other Required Treatment</h2>
                    {finalTreatmentPlan.map((tx) => {
                        return (
                            <div key={tx.id} className='col-6 d-flex justify-content-between'>
                                <p className='fs-5'>{tx.name}</p>
                                <p className='fs-5'>${tx.cost}</p>
                            </div>
                        )
                    })}
                    {constantArrays.map((txArray) => {
                        let title
                        if (txArray === sedationArray) { title = 'Sedation' }
                        if (txArray === hygieneVisitsArray) { title = 'Hygiene Visits' }
                        if (txArray === warrantyArray) { title = 'Warranty' }
                        return (
                            <div className='col-12 my-1 d-flex flex-column align-items-center'>
                                <h3>{title}</h3>
                                <div className='col-12 d-flex justify-content-evenly align-items-center'>
                                    {txArray.map((tx) => {
                                        return (
                                            <div key={tx.id} className='col-2 d-flex flex-column justify-content-between align-items-center border border-dark'>
                                                <p className='fs-5'>{tx.name}</p>
                                                <p className='fs-5'>${tx.cost}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className='col-6 d-flex fs-3 justify-content-between align-items-center'>
                        <h3>Total</h3>
                        <p>=</p>
                        <h3>${total}</h3>
                        <p>+</p>
                        <div className='border border-dark text-center px-1'>______________</div>
                        <p>=</p>
                        <div className='border border-dark text-center px-1'>______________________</div>
                    </div>
                    <div className='col-11 fs-5'>
                        <p className='text-center'>This treatment plan and the procedures recommended are specifically formulated for you and your present conditions.
                            It is valid for 90 days and cannot be combined with any other offers or treatment.</p>
                        <div className='d-flex flex-column align-items-center col-12'>
                            <div className='d-flex justify-content-between col-9 my-3'>
                                <p className='border-top border-dark col-6'>Patient's Signature</p>
                                <p className='border-top border-dark col-3'>Date</p>
                            </div>
                            <div className='d-flex justify-content-between col-9 my-3'>
                                <p className='border-top border-dark col-6'>Treatment Coordinator's Signature</p>
                                <p className='border-top border-dark col-3'>Date</p>
                            </div>
                        </div>
                        <p className='text-center'>*IV Sedation fee is paid directly to a licensed anesthesiologist.</p>
                    </div>
                </div>
                <button className='btn btn-success' onClick={generatePdf}>Generate PDF</button>
            </div>
        </div>
    );
};

export default FinalTxPlan;