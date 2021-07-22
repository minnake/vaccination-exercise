import React, { useState, useEffect } from 'react'
import vaccinationsSercive from './services/vaccinations'
import antiquaService from './services/antiqua'
import solarBuddhicaService from './services/solarBuddhica'
import zerpfyService from './services/zerpfy'
import './index.css'

const App = () => {
  const [vaccinations, setVaccinations] = useState([])
  const [antiqua, setAntiqua] = useState ([])
  const [solarBuddhica, setSolarBuddhica] = useState ([])
  const [zerpfy, setZerpfy] = useState ([])

  useEffect(() => {
    vaccinationsSercive
      .getAll()
      .then(initialVaccinations => {
        setVaccinations(initialVaccinations)
      })
  })

  useEffect(() => {
    antiquaService
      .getAll()
      .then(initialVaccinations => {
        setAntiqua(initialVaccinations)
      })
  })

  useEffect(() => {
    solarBuddhicaService
      .getAll()
      .then(initialVaccinations => {
        setSolarBuddhica(initialVaccinations)
      })
  })

  useEffect(() => {
    zerpfyService
      .getAll()
      .then(initialVaccinations => {
        setZerpfy(initialVaccinations)
      })
  })

  //total sum of injections done
  const vaccinationsLength = vaccinations.length

  //total sum of orders
  const orderSum = antiqua.length + solarBuddhica.length + zerpfy.length

  //check how many orders came "2021-04-12"  
  //-> change the date form from 2021-04-12T11:10:06.473587Z to 2021-04-12 in every array
  //-> calculate orders from Antiqua, SolarBuddhica and Zerpfy
  
  
  //check how  many vaccines expired "2021-03-20"
  //-> bottle expires in 30 days from arrival
  //-> remaining injections in expired bottles
  //-> injections done from the expired bottles


  return (
    <div>
      <div>
        <h2>Vaccinations exercise</h2>
      </div>
      <div>
        <p>Total number of orders {orderSum}.</p>
        <p>Vaccinations done {vaccinationsLength}.</p>
        <p>-day- arrived -number- orders.</p>
        <p>When counted from -day- -number- vaccines expired
          before usage (injections in the expiring bottles -number-
          and injections done from the expired bottles -number-)</p>
      </div>
    </div>
  )

}

export default App
