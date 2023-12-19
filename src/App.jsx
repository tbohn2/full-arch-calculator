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
    { id: 5, name: "N/A", cost: 0 },
    { id: 6, name: "Halcion", cost: 450 },
    { id: 7, name: "IV Sedation", cost: 1200 }
  ]

  const removalArray = [
    { id: 8, name: "N/A", cost: 0 },
    { id: 9, name: "<5", cost: 1500 },
    { id: 10, name: "6-10", cost: 3000 },
    { id: 11, name: ">11", cost: 4500 }
  ]

  // Bone Grafting and Alveoplasty
  const foundationArray = [
    { id: 12, name: "N/A", cost: 0 },
    { id: 13, name: "<5", cost: 1500 },
    { id: 14, name: "6-10", cost: 3000 },
    { id: 15, name: ">11", cost: 4500 }
  ]

  const specialProcedureArray = [
    { id: 16, name: "N/A", cost: 0 },
    { id: 17, name: "Ridge Augmentation", cost: 1500 },
    { id: 18, name: "Sinus Lift", cost: 2500 },
    { id: 19, name: "Other", cost: 0 }
  ]

  const implantsArray = [
    { id: 20, name: "4 or less", cost: 7500 },
    { id: 21, name: "5", cost: 10000 },
    { id: 22, name: "6", cost: 12500 },
    { id: 23, name: "7+", cost: 15000 }
  ]

  const abutmentsArray = [
    { id: 24, name: "4 or less", cost: 2500 },
    { id: 25, name: "5", cost: 3000 },
    { id: 26, name: "6", cost: 3500 },
    { id: 27, name: "7+", cost: 5000 }
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
    { name: "Sedation", array: sedationArray, stateName: "sedation" },
    { name: "Hygiene Visits", array: hygieneVisitsArray, stateName: "hygieneVisits" },
    { name: "Warranty", array: warrantyArray, stateName: "warranty" },
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

  const [costState, setCostState] = useState({
    treatmentPlanning: 0,
    sedation: 0,
    maxRemoval: 0,
    mandRemoval: 0,
    maxFoundation: 0,
    mandFoundation: 0,
    maxSpecialProcedure: 0,
    mandSpecialProcedure: 0,
    maxImplants: 0,
    mandImplants: 0,
    maxAbutments: 0,
    mandAbutments: 0,
    maxFinalSmile: 0,
    mandFinalSmile: 0,
    hygieneVisits: 0,
    warranty: 0,
  });

  const [total, setTotal] = useState(0);

  const updateCost = (cost, event) => {
    const { id, name, checked, title } = event.target;
    setCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost }));
    updateCheckedItems(id, title, checked, cost);
  }

  const updateCheckedItems = (id, itemName, isChecked, cost) => {
    const newCheckedItem = { id: id, name: itemName, cost: cost }
    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, newCheckedItem]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
    }
  };

  useEffect(() => {
    const newTotal = Object.values(costState).reduce((total, cost) => total + cost, 0);
    setTotal(newTotal);
  }, [costState]);

  const [checkedItems, setCheckedItems] = useState([]);

  const finalizePDF = () => {
    console.log(checkedItems)
    TxPlan(checkedItems)
  }

  return (
    <div>
      <h1>My Dental Full Arch Calculator</h1>
      {selectionsArray.map((selection, index) => {
        const { name, array, stateName } = selection;
        const cost = costState[stateName];
        return (
          <div className="btn-group col-12" role="group" aria-label="Basic checkbox toggle button group">
            <h2>{name}</h2>
            {array.map((item, index) => (
              <div>
                <input title={item.name} type="checkbox" className="btn-check" name={stateName} id={item.id} autoComplete="off" onChange={(e) => updateCost(item.cost, e)}></input>
                <label className="btn btn-outline-primary" htmlFor={item.id}>{item.name}</label>
              </div>
            ))}
            <div>Cost: {cost} </div>
          </div>
        )
      })}
      <h2>Maxillary</h2>
      {maxillaryArray.map((selection, index) => {
        const { name, array, stateName } = selection;
        const cost = costState[stateName];
        return (
          <div className="btn-group col-12" role="group" aria-label="Basic checkbox toggle button group">
            <h2>{name}</h2>
            {array.map((item, index) => (
              <div>
                <input title={item.name} type="checkbox" className="btn-check" name={stateName} id={'max' + item.id} autoComplete="off" onChange={(e) => updateCost(item.cost, e)}></input>
                <label className="btn btn-outline-primary" htmlFor={'max' + item.id}>{item.name}</label>
              </div>
            ))}
            <div>Cost: {cost} </div>
          </div>
        )
      })}
      <h2>Mandibular</h2>
      {mandibularArray.map((selection, index) => {
        const { name, array, stateName } = selection;
        const cost = costState[stateName];
        return (
          <div className="btn-group col-12" role="group" aria-label="Basic checkbox toggle button group">
            <h2>{name}</h2>
            {array.map((item, index) => (
              <div>
                <input title={item.name} type="checkbox" className="btn-check" name={stateName} id={'mand' + item.id} autoComplete="off" onChange={(e) => updateCost(item.cost, e)}></input>
                <label className="btn btn-outline-primary" htmlFor={'mand' + item.id}>{item.name}</label>
              </div>
            ))}
            <div>Cost: {cost} </div>
          </div>
        )
      })}
      <div>Total: {total}</div>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={finalizePDF}>
        Finalize PDF
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Treatment Plan Preview</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body col-10">
              {TxPlan(checkedItems)}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
};

export default App
