import React, { useRef } from 'react';
import Footer from '../components/footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import headerLogo from '../assets/MyDentalHeader.png'
import footerLogo from '../assets/MyDentalFooter.png'

const FinalTxPlan = (tx, totals) => {
    const { treatmentPlanningTotal, maxTotal, mandTotal, total } = totals;

    const sedationArray = [
        { id: 6, name: "Halcion", cost: 450 },
        { id: 7, name: "IV*", cost: 1200 }
    ]

    const hygieneVisitsArray = [
        { id: 32, name: "1 Year", cost: 0 },
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
        const pdfDocument = new jsPDF({ unit: 'px', format: 'letter', orientation: 'portrait' });
        let canvasArray = []
        if (finalMaxTxPlan.length != 0) { canvasArray.push(txPlan1Ref) }
        if (finalMandTxPlan.length != 0) { canvasArray.push(txPlan2Ref) }
        canvasArray.push(txPlan3Ref)

        for (let i = 0; i < canvasArray.length; i++) {

            const canvas = await html2canvas(canvasArray[i].current);
            const aspectRatio = canvas.width / canvas.height;
            const height = pdfDocument.internal.pageSize.getHeight();
            const width = aspectRatio * height;
            // Change quality (number between 0 and 1) of the image
            const image = canvas.toDataURL('image/jpeg', 0.3)

            pdfDocument.addImage(image, 'JPEG', 0, 0, width, height);
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
                    <div ref={ref} className="full-page my-1 border-start border-end border-3 border-dark d-flex flex-column justify-content-between align-items-center">
                        <div>
                            <img src={headerLogo} alt="My Dental Header" className='full-width-container' />
                            <h1 className='col-12 py-3 text-center text-decoration-underline'>Treatment Plan For {title}</h1>
                        </div>
                        <div className='col-12 mb-5 pb-5 d-flex flex-column align-items-center justify-content-between'>
                            {arch.map((tx) => {
                                return (
                                    <div key={tx.id} className='col-8 d-flex'>
                                        <p className='fs-4 col-8 border border-dark m-0 p-3'>{tx.name}</p>
                                        <p className='fs-4 col-4 border border-dark m-0 p-3'>${tx.cost}</p>
                                    </div>
                                )
                            })}
                            <div className='col-8 d-flex'>
                                <p className='fs-3 fw-bold col-8 border border-dark m-0 p-3'>Total</p>
                                <p className='fs-3 fw-bold col-4 border border-dark m-0 p-3'>${total}</p>
                            </div>
                        </div>
                        <div className='full-width-container'>
                            <img src={footerLogo} alt="My Dental Footer" />
                        </div>
                    </div>
                )
            })}
            <div className='d-flex flex-column'>
                <div ref={txPlan3Ref} className="full-page border-dark border-start border-end border-3 d-flex flex-column align-items-center justify-content-between">
                    <img src={headerLogo} alt="My Dental Logo" className='full-width-container' />
                    <h1 className='col-12 text-center text-decoration-underline'>Other Required Treatment</h1>
                    {finalTreatmentPlan.map((tx) => {
                        return (
                            <div key={tx.id} className='col-6 mt-1 d-flex justify-content-between'>
                                <p className='fs-5 m-0'>{tx.name}</p>
                                <p className='fs-5 m-0'>${tx.cost}</p>
                            </div>
                        )
                    })}
                    {constantArrays.map((txArray) => {
                        let title
                        if (txArray === sedationArray) { title = 'Sedation' }
                        if (txArray === hygieneVisitsArray) { title = 'Hygiene Visits' }
                        if (txArray === warrantyArray) { title = 'Warranty' }
                        return (
                            <div className='col-11 my-1 d-flex justify-content-between align-items-center'>
                                <h3 className='col-2'>{title}</h3>
                                <div className='col-12 d-flex'>
                                    {txArray.map((tx) => {
                                        return (
                                            <div key={tx.id} className='col-2 d-flex flex-column px-3 justify-content-between align-items-center border border-dark'>
                                                <p className='fs-5 m-0 text-center'>{tx.name}</p>
                                                <p className='fs-5 m-0 text-center'>${tx.cost}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <div className='col-11 d-flex fs-3 justify-content-between align-items-center fw-bold'>
                        <h3 className='fw-bold'>Total</h3>
                        <p>=</p>
                        <h3 className='fw-bold'>${total}</h3>
                        <p>+</p>
                        <div className='col-3 border border-dark text-center px-1'>&nbsp;</div>
                        <p>=</p>
                        <div className='col-4 border border-dark text-center px-1'>&nbsp;</div>
                    </div>
                    <div className='col-11 fs-5'>
                        <p className='text-center'>This treatment plan and the procedures recommended are specifically formulated for you and your present conditions.
                            It is valid for 90 days and cannot be combined with any other offers or treatment.</p>
                        <div className='d-flex flex-column align-items-center col-12 mt-4'>
                            <div className='d-flex justify-content-between col-10 my-1'>
                                <p className='border-top border-dark col-6'>Patient's Signature</p>
                                <p className='border-top border-dark col-3'>Date</p>
                            </div>
                            <div className='d-flex justify-content-between col-10 my-2'>
                                <p className='border-top border-dark col-6'>Treatment Coordinator's Signature</p>
                                <p className='border-top border-dark col-3'>Date</p>
                            </div>
                        </div>
                        <p className='text-center'>*IV Sedation fee is paid directly to a licensed anesthesiologist.</p>
                    </div>
                    <div className='full-width-container'>
                        <img src={footerLogo} alt="My Dental Footer" />
                    </div>
                </div>
                <button className='btn btn-success my-3' onClick={generatePdf}>Generate PDF</button>
            </div>
        </div>
    );
};

export default FinalTxPlan;