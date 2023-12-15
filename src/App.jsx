import { useState, useEffect } from 'react'
import './App.css'

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
    { name: "Removal", array: removalArray, stateName: "removal" },
    { name: "Foundation", array: foundationArray, stateName: "foundation" },
    { name: "Special Procedure", array: specialProcedureArray, stateName: "specialProcedure" },
    { name: "Implants", array: implantsArray, stateName: "implants" },
    { name: "Abutments", array: abutmentsArray, stateName: "abutments" },
    { name: "Final Smile", array: finalSmileArray, stateName: "finalSmile" },
    { name: "Hygiene Visits", array: hygieneVisitsArray, stateName: "hygieneVisits" },
    { name: "Warranty", array: warrantyArray, stateName: "warranty" },
  ];

  const [costState, setCostState] = useState({
    treatmentPlanning: 0,
    sedation: 0,
    removal: 0,
    foundation: 0,
    specialProcedure: 0,
    implants: 0,
    abutments: 0,
    finalSmile: 0,
    hygieneVisits: 0,
    warranty: 0,
  });

  const [total, setTotal] = useState(0);

  const updateCost = (cost, event) => {
    const { name, checked, title } = event.target;
    setCostState((prevCost) => ({ ...prevCost, [name]: checked ? prevCost[name] + cost : prevCost[name] - cost }));
    updateCheckedItems(title, checked, cost);
  }

  useEffect(() => {
    const newTotal = costState.treatmentPlanning + costState.sedation + costState.removal + costState.foundation + costState.specialProcedure + costState.implants + costState.abutments + costState.finalSmile + costState.hygieneVisits + costState.warranty;
    setTotal(newTotal);
  }, [costState]);

  const [checkedItems, setCheckedItems] = useState([]);

  const updateCheckedItems = (itemName, isChecked, cost) => {
    const newCheckedItem = { name: itemName, cost: cost }
    if (isChecked) {
      setCheckedItems((prevItems) => [...prevItems, newCheckedItem]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item.name !== itemName));
    }
  };

  const finalizePDF = () => { console.log(checkedItems) }

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
      <div>Total: {total}</div>
      <button onClick={finalizePDF}>Finalize PDF</button>
    </div>

  )
};

export default App
