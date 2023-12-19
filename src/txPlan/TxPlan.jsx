import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TxPlan = (txArray) => {


    const generatePdf = async () => {
        const pdfDocument = new jsPDF();
        const txPlanRef = useRef(null);
        const canvas = await html2canvas(txPlanRef.current);

        pdfDocument.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);

        pdfDocument.save('TxPlan.pdf');
    };

    return (
        <div className="col-12">
            {txArray.map((tx, index) => {
                const { name, cost } = tx;
                return (
                    <div key={index} className="col-12 d-flex justify-content-between">
                        <div>{name}</div>
                        <div>{cost}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default TxPlan;