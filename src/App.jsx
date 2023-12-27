import { useState, useEffect } from 'react'
import './App.css'
import TxPlan from './txPlan/TxPlan'

function App() {
  const treatmentPlanningArray = [
    { id: 1, name: "Records", cost: 550 },
    { id: 2, name: "Comprehensive Exam", cost: 350 },
    { id: 3, name: "Smile Design", cost: 400 },
    { id: 4, name: "Healing Teeth", cost: 1700 }
  ]

  const sedationArray = [
    { id: 6, name: "Halcion Sedation", cost: 450 },
    { id: 7, name: "IV Sedation", cost: 1200 }
  ]

  const removalArray = [
    { id: 9, name: [1, 5], cost: 1500 },
    { id: 10, name: [6, 10], cost: 3000 },
    { id: 11, name: 11, cost: 4500 }
  ]

  // Bone Grafting and Alveoplasty
  const foundationArray = [
    { id: 13, name: [1, 5], cost: 1500 },
    { id: 14, name: [6, 10], cost: 3000 },
    { id: 15, name: 11, cost: 4500 }
  ]

  const specialProcedureArray = [
    { id: 17, name: "Ridge Augmentation", cost: 1500 },
    { id: 18, name: "Sinus Lift", cost: 2500 },
    // { id: 19, name: "Other", cost: 0 }
  ]

  const implantsArray = [
    { id: 20, name: [1, 4], cost: 7500 },
    { id: 21, name: 5, cost: 10000 },
    { id: 22, name: 6, cost: 12500 },
    { id: 23, name: 7, cost: 15000 }
  ]

  const abutmentsArray = [
    { id: 24, name: [1, 4], cost: 2500 },
    { id: 25, name: 5, cost: 3000 },
    { id: 26, name: 6, cost: 3500 },
    { id: 27, name: 7, cost: 5000 }
  ]

  const finalSmileArray = [
    { id: 28, name: "Acrylic", cost: 3000 },
    { id: 29, name: "PMMA", cost: 4500 },
    { id: 30, name: "PMMA w/ Titanium Bar", cost: 6500 },
    { id: 31, name: "Porcelain (Zirconia)", cost: 9500 }
  ]

  const hygieneVisitsArray = [
    { id: 32, name: "+1 Year", cost: 300 },
    { id: 33, name: "+2 Year", cost: 500 },
    { id: 34, name: "+3 Year", cost: 650 },
    { id: 35, name: "+4 Year", cost: 750 }
  ]

  const warrantyArray = [
    { id: 36, name: "+1 Year", cost: 750 },
    { id: 37, name: "+2 Year", cost: 1400 },
    { id: 38, name: "+3 Year", cost: 2000 },
    { id: 39, name: "+4 Year", cost: 3500 }
  ]

  const selectionsArray = [
    { name: "Treatment Planning", array: treatmentPlanningArray, stateName: "treatmentPlanning" },
    // { name: "Sedation", array: sedationArray, stateName: "sedation" },
    // { name: "Hygiene Visits", array: hygieneVisitsArray, stateName: "hygieneVisits" },
    // { name: "Warranty", array: warrantyArray, stateName: "warranty" },
  ];

  const maxillaryArray = [
    { name: "Removal", array: removalArray, stateName: "maxRemoval" },
    { name: "Foundation", array: foundationArray, stateName: "maxFoundation" },
    { name: "Special Procedure", array: specialProcedureArray, stateName: "maxSpecialProcedure" },
    { name: "Implants", array: implantsArray, stateName: "maxImplants" },
    { name: "Abutments", array: abutmentsArray, stateName: "maxAbutments" },
    { name: "Final Smile", array: finalSmileArray, stateName: "maxFinalSmile" }
  ];

  const mandibularArray = [
    { name: "Removal", array: removalArray, stateName: "mandRemoval" },
    { name: "Foundation", array: foundationArray, stateName: "mandFoundation" },
    { name: "Special Procedure", array: specialProcedureArray, stateName: "mandSpecialProcedure" },
    { name: "Implants", array: implantsArray, stateName: "mandImplants" },
    { name: "Abutments", array: abutmentsArray, stateName: "mandAbutments" },
    { name: "Final Smile", array: finalSmileArray, stateName: "mandFinalSmile" }
  ];

  const [treatmentPlanningCostState, setTxPlanCostState] = useState(0);

  const [maxillaryTxPlanCostState, setMaxTxPlanCostState] = useState({
    maxRemoval: 0,
    maxFoundation: 0,
    maxSpecialProcedure: 0,
    maxImplants: 0,
    maxAbutments: 0,
    maxFinalSmile: 0,
    total: 0
  });

  const [mandibularTxPlanCostState, setMandTxPlanCostState] = useState({
    mandRemoval: 0,
    mandFoundation: 0,
    mandSpecialProcedure: 0,
    mandImplants: 0,
    mandAbutments: 0,
    mandFinalSmile: 0,
    total: 0
  });

  const [total, setTotal] = useState(0);

  const updateCost = (cost, event) => {
    const { id, name, checked, title } = event.target;
    const idNum = id.replace(/\D/g, "");
    const arch = id.replace(/\d/g, "");
    if (idNum >= 1 && idNum <= 4) {
      setTxPlanCostState((prevCost) => prevCost + cost);
    }
    if (arch === 'max') {
      setMaxTxPlanCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost }));
      setMaxTxPlanCostState((prevCost) => ({ ...prevCost, total: Object.values(prevCost).reduce((total, cost) => total + cost, 0) }));
    }
    if (arch === 'man') {
      setMandTxPlanCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost }));
      setMandTxPlanCostState((prevCost) => ({ ...prevCost, total: Object.values(prevCost).reduce((total, cost) => total + cost, 0) }));
    }
    updateCheckedItems(idNum, arch, title, checked, cost);
  }

  const [checkedItems, setCheckedItems] = useState({
    txPlan: [],
    maxTxPlan: [],
    mandTxPlan: [],
  });

  const updateCheckedItems = (idNum, arch, itemName, isChecked, cost) => {
    const newCheckedItem = { id: idNum, name: itemName, cost: cost }
    const stateName = arch + 'TxPlan';
    if (isChecked) {
      setCheckedItems[stateName]((prevItems) => [...prevItems, newCheckedItem]);
    } else {
      setCheckedItems[stateName]((prevItems) => prevItems.filter((item) => item.name !== itemName));
    }
  };

  useEffect(() => {
    const newTotal = treatmentPlanningCostState + maxillaryTxPlanCostState.total + mandibularTxPlanCostState.total;
    setTotal(newTotal);
  }, [treatmentPlanningCostState, maxillaryTxPlanCostState, mandibularTxPlanCostState]);


  const finalizePDF = () => {
    TxPlan(checkedItems, total)
  }

  return (
    <div>
      <h1>My Dental Full Arch Calculator</h1>
      <h2>Treatment Planning</h2>
      {treatmentPlanningArray.map((selection, index) => {
        const cost = treatmentPlanningCostState;
        return (
          <div className="btn-group col-12" role="group" aria-label="Basic checkbox toggle button group">
            <div>
              <input title={selection.name} type="checkbox" className="btn-check" id={selection.id} autoComplete="off" onChange={(e) => updateCost(selection.cost, e)}></input>
              <label className="btn btn-outline-primary" htmlFor={selection.id}>{selection.name}</label>
            </div>

            <div>Cost: {cost} </div>
          </div>
        )
      })}
      <h2>Maxillary</h2>
      {maxillaryArray.map((selection, index) => {
        const { name, array, stateName } = selection;
        const cost = maxillaryTxPlanCostState[stateName];
        return (
          <div className="btn-group col-12" role="group" aria-label="Basic checkbox toggle button group">
            <h2>{name}</h2>
            {array.map((item, index) => {
              const id = 'max' + item.id;
              let display = item.name;
              if (Array.isArray(display)) {
                display = `${item.name[0]} - ${item.name[1]}`
              }
              if (display === 7 || display === 11) {
                display = `${display}+`;
              }
              return (
                <div key={id}>
                  <input title={display} type="checkbox" className="btn-check" name={stateName} id={id} autoComplete="off" onChange={(e) => updateCost(item.cost, e)}></input>
                  <label className="btn btn-outline-primary" htmlFor={id}>{display}</label>
                </div>
              )
            })}
            <div>Cost: {cost} </div>
          </div>
        )
      })}
      <h2>Mandibular</h2>
      {mandibularArray.map((selection, index) => {
        const { name, array, stateName } = selection;
        const cost = mandibularTxPlanCostState[stateName];
        return (
          <div className="btn-group col-12" role="group" aria-label="Basic checkbox toggle button group">
            <h2>{name}</h2>
            {array.map((item, index) => {
              const id = 'man' + item.id;
              let display = item.name;
              if (Array.isArray(display)) {
                display = `${item.name[0]} - ${item.name[1]}`
              }
              if (display === 7 || display === 11) {
                display = `${display}+`;
              }
              return (
                <div key={id}>
                  <input title={display} type="checkbox" className="btn-check" name={stateName} id={id} autoComplete="off" onChange={(e) => updateCost(item.cost, e)}></input>
                  <label className="btn btn-outline-primary" htmlFor={id}>{display}</label>
                </div>
              )
            })}
            <div>Cost: {cost} </div>
          </div>
        )
      })}
      <div>Total: {total}</div>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={finalizePDF}>
        Preview PDF
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content d-flex justify-content-center">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Treatment Plan Preview</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {TxPlan(checkedItems, total)}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default App