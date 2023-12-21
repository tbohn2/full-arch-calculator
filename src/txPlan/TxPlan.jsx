import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TxPlan = (txArray, total) => {
    let treatmentPlan = []

    for (let i = 0; i < txArray.length; i++) {
        const id = txArray[i].id.replace(/\D/g, "");
        const arch = txArray[i].id.replace(/\d/g, "");
        let name = txArray[i].name
        let cost = txArray[i].cost
        if (id >= 1 && id <= 4) { treatmentPlan.push(txArray[i]) }
        if (id >= 5 && id <= 7) { treatmentPlan.push(txArray[i]) }
        if (id >= 9 && id <= 11) {
            if (arch === 'max') {
                name = `Upper Teeth Removal: ${name}`;
            } else {
                name = `Lower Teeth Removal: ${name}`;
            }
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 13 && id <= 15) {
            if (arch === 'max') {
                name = `Upper Foundational Work: ${name}`;
            } else {
                name = `Lower Foundational Work: ${name}`;
            }
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 17 && id <= 18) {
            if (arch === 'max') {
                name = `Upper ${name}`;
            } else {
                name = `Lower ${name}`;
            }
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 20 && id <= 23) {
            if (arch === 'max') {
                name = `Upper Implants: ${name}`;
            } else {
                name = `Lower Implants: ${name}`;
            }
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 24 && id <= 27) {
            if (arch === 'max') {
                name = `Upper Abutments: ${name}`;
            } else {
                name = `Lower Abutments: ${name}`;
            }
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 28 && id <= 31) {
            if (arch === 'max') {
                name = `Upper Final: ${name}`;
            } else {
                name = `Lower Final: ${name}`;
            }
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 32 && id <= 35) {
            name = `Hygiene Visit: ${name}`;
            treatmentPlan.push({ id, name, cost })
        }
        if (id >= 36 && id <= 39) {
            name = `Warranty: ${name}`;
            treatmentPlan.push({ id, name, cost })
        }
    }

    treatmentPlan.sort((a, b) => {
        const idA = parseInt(a.id.slice(-2));
        const idB = parseInt(b.id.slice(-2));
        return idA - idB;
    });


    const txPlanRef = useRef(null);
    const generatePdf = async () => {
        const pdfDocument = new jsPDF();
        const canvas = await html2canvas(txPlanRef.current);

        pdfDocument.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);

        pdfDocument.save('TxPlan.pdf');
    };

    return (
        <div ref={txPlanRef} className="col-12">
            <h1>Treatment Plan</h1>
            {treatmentPlan.map((tx) => {
                return (
                    <div key={tx.id} className='col-12 d-flex justify-content-between'>
                        <p>{tx.name}</p>
                        <p>${tx.cost}</p>
                    </div>
                )
            })}
            <div className='col-12 d-flex justify-content-between'>
                <h3>Total</h3>
                <h3>${total}</h3>
            </div>
        </div>
    );
};

export default TxPlan;