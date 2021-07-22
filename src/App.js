import React, { useState, useEffect } from 'react'
import vaccinationsSercive from './services/vaccinations'
import antiquaService from './services/antiqua'
import solarBuddhicaService from './services/solarBuddhica'
import zerpfyService from './services/zerpfy'
import './index.css'
import moment from 'moment'
// import Vaccinations from './components/Vaccinations'

const App = () => {
  const [vaccinations, setVaccinations] = useState([])
  const [antiqua, setAntiqua] = useState([])
  const [solarBuddhica, setSolarBuddhica] = useState([])
  const [zerpfy, setZerpfy] = useState([])

  useEffect(() => {
    vaccinationsSercive
      .getAll()
      .then(initialVaccinations => {
        setVaccinations(initialVaccinations)
      })
  }, [vaccinations]);

  useEffect(() => {
    antiquaService
      .getAll()
      .then(initialVaccinations => {
        setAntiqua(initialVaccinations)
      })
  }, [antiqua]);

  useEffect(() => {
    solarBuddhicaService
      .getAll()
      .then(initialVaccinations => {
        setSolarBuddhica(initialVaccinations)
      })
  }, [solarBuddhica]);

  useEffect(() => {
    zerpfyService
      .getAll()
      .then(initialVaccinations => {
        setZerpfy(initialVaccinations)
      })
  }, [zerpfy]);


  //join Antiqua, SolarBuddhica and Zerphy arrays to one
  //modify manufacturers array so the date is in form yyyy-mm-dd
  const compinedArrays = [].concat(antiqua, solarBuddhica, zerpfy)

  const formatDate = (value) => {
    return moment(value).format('YYYY-MM-DD')
  }

  const manufacturers = compinedArrays.map(item => ({
    id: item.id,
    orderNumber: item.orderNumber,
    responsiblePerson: item.responsiblePerson,
    healthCareDistrict: item.healthCareDistrict,
    vaccine: item.vaccine,
    injections: item.injections,
    arrived: formatDate(item.arrived)
  }))

  //check how many orders came "2021-04-12" -> 28 orders arrived that day
  //need to find the sum of order of that date from manufacturers array
  

  //total sum of injections done
  const injectionsDone = vaccinations.length

  //total sum of orders
  const orderSum = manufacturers.length

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
        <p>Vaccinations done {injectionsDone}.</p>
        <p>-day- arrived -number- orders.</p>
        <p>When counted from -day- -number- vaccines expired
          before usage (injections in the expiring bottles -number-
          and injections done from the expired bottles -number-)</p>
      </div>
      {/* <div>
        <table>
          <Vaccinations passedValue={passedValue} />
        </table>
      </div> */}
    </div>
  )

}

export default App
