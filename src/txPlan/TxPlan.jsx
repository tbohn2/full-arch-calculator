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
        { id: 37, name: "2 Years", cost: 750 },
        { id: 38, name: "3 Years", cost: 750 },
        { id: 39, name: "4 Years", cost: 1400 },
        { id: 40, name: "5 Years", cost: 2000 },
        { id: 41, name: "6 Years", cost: 3500 }
    ]

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


    const txPlan1Ref = useRef(null);
    const txPlan2Ref = useRef(null);
    const txPlan3Ref = useRef(null);

    const generatePdf = async () => {
        const pdfDocument = new jsPDF();

        const canvas1 = await html2canvas(txPlan1Ref.current);
        pdfDocument.addImage(canvas1.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
        pdfDocument.addPage();

        const canvas2 = await html2canvas(txPlan2Ref.current);
        pdfDocument.addImage(canvas2.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
        pdfDocument.addPage();

        const canvas3 = await html2canvas(txPlan3Ref.current);
        pdfDocument.addImage(canvas3.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
        pdfDocument.addPage();

        pdfDocument.save('TxPlan.pdf');
    };
    return (
        <div>
            <img src={myDentalLogo} alt="My Dental Logo" />
            <div ref={txPlan1Ref} className="col-12 d-flex flex-column align-items-center">
                <h1>Treatment Plan For Upper</h1>
                {finalTreatmentPlan.map((tx) => {
                    return (
                        <div key={tx.id} className='col-9 d-flex justify-content-between'>
                            <p>{tx.name}</p>
                            <p>${tx.cost}</p>
                        </div>
                    )
                })}
                <div className='col-9 d-flex justify-content-between'>
                    <h3>Total</h3>
                    <h3>${treatmentPlanningTotal}</h3>
                </div>
            </div>
            <div ref={txPlan2Ref} className="col-12 d-flex flex-column align-items-center">
                <img src={myDentalLogo} alt="My Dental Logo" />
                <h1>Treatment Plan For Lower</h1>
                {finalMaxTxPlan.map((tx) => {
                    return (
                        <div key={tx.id} className='col-9 d-flex justify-content-between'>
                            <p>{tx.name}</p>
                            <p>${tx.cost}</p>
                        </div>
                    )
                })}
                <div className='col-9 d-flex justify-content-between'>
                    <h3>Total</h3>
                    <h3>${maxTotal}</h3>
                </div>
            </div>
            <div ref={txPlan3Ref} className="col-12 d-flex flex-column align-items-center">
                <img src={myDentalLogo} alt="My Dental Logo" />
                <h1>Treatment Plan For Both Arches</h1>
                {finalMandTxPlan.map((tx) => {
                    return (
                        <div key={tx.id} className='col-9 d-flex justify-content-between'>
                            <p>{tx.name}</p>
                            <p>${tx.cost}</p>
                        </div>
                    )
                })}
                <div className='col-9 d-flex justify-content-between'>
                    <h3>Total</h3>
                    <h3>${mandTotal}</h3>
                </div>
                <button onClick={generatePdf}>Generate PDF</button>
            </div>
        </div>
    );
};

export default FinalTxPlan;