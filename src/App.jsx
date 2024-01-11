import { useState, useEffect } from 'react'
import './App.css'
import FinalTxPlan from './txPlan/TxPlan'
import logo from './assets/myDentalLogo.png'

function App() {
  const treatmentPlanningArray = [
    { id: 1, name: "Records", cost: 550 },
    { id: 2, name: "Comprehensive Exam", cost: 350 },
    { id: 3, name: "Smile Design", cost: 400 },
    { id: 4, name: "Healing Teeth", cost: 1700 }
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

  const maxillaryArray = [
    { name: "Tooth/Implant Removal", array: removalArray, stateName: "maxRemoval" },
    { name: "Bone Graft/Alveoplasty", array: foundationArray, stateName: "maxFoundation" },
    { name: "Special Procedure", array: specialProcedureArray, stateName: "maxSpecialProcedure" },
    { name: "Implants", array: implantsArray, stateName: "maxImplants" },
    { name: "Abutments", array: abutmentsArray, stateName: "maxAbutments" },
    { name: "Final Smile", array: finalSmileArray, stateName: "maxFinalSmile" }
  ];

  const mandibularArray = [
    { name: "Tooth/Implant Removal", array: removalArray, stateName: "mandRemoval" },
    { name: "Bone Graft/Alveoplasty", array: foundationArray, stateName: "mandFoundation" },
    { name: "Special Procedure", array: specialProcedureArray, stateName: "mandSpecialProcedure" },
    { name: "Implants", array: implantsArray, stateName: "mandImplants" },
    { name: "Abutments", array: abutmentsArray, stateName: "mandAbutments" },
    { name: "Final Smile", array: finalSmileArray, stateName: "mandFinalSmile" }
  ];

  const archArrays = [maxillaryArray, mandibularArray];

  const [treatmentPlanningCostState, setTxPlanCostState] = useState({
    Records: 0,
    ComprehensiveExam: 0,
    SmileDesign: 0,
    HealingTeeth: 0,
    total: 0
  });

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
      setTxPlanCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost, total: checked ? prevCost.total + cost : prevCost.total - cost }));
    }
    if (arch === 'max') {
      setMaxTxPlanCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost, total: checked ? prevCost.total + cost : prevCost.total - cost }));
    }
    if (arch === 'mand') {
      setMandTxPlanCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost, total: checked ? prevCost.total + cost : prevCost.total - cost }));
    }
    updateCheckedItems(idNum, arch, title, checked, cost);
  }

  const [checkedItems, setCheckedItems] = useState({
    TxPlan: [],
    maxTxPlan: [],
    mandTxPlan: [],
  });

  const updateCheckedItems = (idNum, arch, itemName, isChecked, cost) => {
    const newCheckedItem = { id: idNum, name: itemName, cost: cost }
    const stateName = arch + 'TxPlan';
    if (isChecked) {
      setCheckedItems(prevState => ({
        ...prevState,
        [stateName]: [...prevState[stateName], newCheckedItem],
      }));
    } else {
      setCheckedItems(prevState => ({
        ...prevState,
        [stateName]: prevState[stateName].filter(item => item.name !== itemName),
      }));
    }
  };

  useEffect(() => {
    const newTotal = treatmentPlanningCostState.total + maxillaryTxPlanCostState.total + mandibularTxPlanCostState.total;
    setTotal(newTotal);
  }, [treatmentPlanningCostState, maxillaryTxPlanCostState, mandibularTxPlanCostState]);


  const totals = {
    treatmentPlanningTotal: treatmentPlanningCostState.total,
    maxTotal: maxillaryTxPlanCostState.total,
    mandTotal: mandibularTxPlanCostState.total,
    total: total
  };

  return (
    <div className='col-12 mt-2 d-flex flex-column align-items-center'>
      <img src={logo} alt="My Dental Logo" className='logo' />
      <h1>My Dental Full Arch Calculator</h1>
      <div className='border border-dark col-9 d-flex flex-column align-items-center'>
        <h2>Treatment Planning</h2>
        <div className="btn-group col-12 d-flex justify-content-evenly" role="group" aria-label="Basic checkbox toggle button group">
          {treatmentPlanningArray.map((selection, index) => {
            const stateName = selection.name.replace(/\s/g, '');
            return (
              <div>
                <input name={stateName} title={selection.name} type="checkbox" className="btn-check" id={selection.id} autoComplete="off" onChange={(e) => updateCost(selection.cost, e)}></input>
                <label className="btn btn-lg btn-outline-dark" htmlFor={selection.id}>{selection.name}</label>
              </div>
            )
          })}
        </div>
        <div className='fw-bold fs-5 bg-dark text-light text-center mt-3 col-12'>Treatment Planning Total: ${treatmentPlanningCostState.total} </div>
      </div>
      <div className='border border-dark col-9 d-flex flex-column align-items-center'>
        {archArrays.map((archArray, index) => {
          let heading, arch, costState
          if (archArray === maxillaryArray) { heading = 'Upper', arch = 'max', costState = maxillaryTxPlanCostState }
          if (archArray === mandibularArray) { heading = 'Lower', arch = 'mand', costState = mandibularTxPlanCostState }

          return (
            <div className='col-12 d-flex flex-column align-items-center'>
              <h2>{heading}</h2>
              {archArray.map((selection, index) => {
                const { name, array, stateName } = selection;
                const cost = costState[stateName];
                return (
                  <div className="col-12 d-flex border-bottom border-dark">
                    <h2 className='col-4 text-start'>{name}</h2>
                    <div className='col-7 btn-group d-flex align-items-center' role="group" aria-label="Basic checkbox toggle button group">
                      {array.map((item, index) => {
                        const id = arch + item.id;
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
                            <label className="btn btn-outline-dark m-1" htmlFor={id}>{display}</label>
                          </div>
                        )
                      })}
                    </div>
                    <div>${cost} </div>
                  </div>
                )
              })}
              <div className='fw-bold fs-5 bg-dark text-light col-12 text-center'>{heading} Total: ${costState.total}</div>
            </div>
          )
        })}

      </div>
      <div className='fw-bold fs-3 border border-dark col-9 text-center'>Total: ${total}</div>
      <h1>PDF Preview:</h1>
      {FinalTxPlan(checkedItems, totals)}
    </div>

  )
};

export default App
