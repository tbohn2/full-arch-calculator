import { useState } from 'react'
import './App.css'

function App() {
  const treatmentPlanningArray = [
    { name: "Records", cost: 550 },
    { name: "Comprehensive Exam", cost: 350 },
    { name: "Smile Design", cost: 400 },
    { name: "Healing Teeth", cost: 1700 }
  ]

  const sedationArray = [
    { name: "N/A", cost: 0 },
    { name: "Halcion", cost: 450 },
    { name: "IV Sedation", cost: 1200 }
  ]

  const removalArray = [
    { name: "N/A", cost: 0 },
    { name: "<5", cost: 1500 },
    { name: "6-10", cost: 3000 },
    { name: ">11", cost: 4500 }
  ]

  // Bone Grafting and Alveoplasty
  const foundationArray = [
    { name: "N/A", cost: 0 },
    { name: "<5", cost: 1500 },
    { name: "6-10", cost: 3000 },
    { name: ">11", cost: 4500 }
  ]

  const specialProcedureArray = [
    { name: "N/A", cost: 0 },
    { name: "Ridge Augmentation", cost: 1500 },
    { name: "Sinus Lift", cost: 2500 },
    { name: "Other", cost: 0 }
  ]

  const implantsArray = [
    { name: "4 or less", cost: 7500 },
    { name: "5", cost: 10000 },
    { name: "6", cost: 12500 },
    { name: "7+", cost: 15000 }
  ]

  const abutmentsArray = [
    { name: "4 or less", cost: 2500 },
    { name: "5", cost: 3000 },
    { name: "6", cost: 3500 },
    { name: "7+", cost: 5000 }
  ]

  const finalSmileArray = [
    { name: "Acrylic", cost: 3000 },
    { name: "PMMA", cost: 4500 },
    { name: "PMMA w/ Titanium Bar", cost: 6500 },
    { name: "Porcelain (Zirconia)", cost: 9500 }
  ]

  const hygieneVisitsArray = [
    { name: "+1 Year", cost: 300 },
    { name: "+2 Year", cost: 500 },
    { name: "+3 Year", cost: 650 },
    { name: "+4 Year", cost: 750 }
  ]

  const warrantyArray = [
    { name: "+1 Year", cost: 750 },
    { name: "+2 Year", cost: 1400 },
    { name: "+3 Year", cost: 2000 },
    { name: "+4 Year", cost: 3500 }
  ]

  return (
    <>

    </>
  )
}

export default App
