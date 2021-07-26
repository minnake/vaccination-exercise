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


  //join Antiqua, SolarBuddhica and Zerpfy arrays to one
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

  //total sum of orders
  const orderSum = manufacturers.length

  //total sum of injections done
  const injectionsDone = vaccinations.length

  //vaccines that came 2021-03-20 -> right sum is 61
  const arrivalDay = '2021-03-20'
  const arrivedOrdersSum = manufacturers.filter(item => item.arrived === arrivalDay).length

  //check how  many vaccines expired "2021-04-12"
  //-> bottle expires in 30 days from arrival
  //-> remaining injections in expired bottles
  //-> injections done from the expired bottles
  //const vaccineData = ['id', 'name', 'sourceBottle', 'injections', 'injected', 'arrived']
  //manufacturers.id === vaccinations.sourceBottle



  //const endDay = '2021-04-12'
  //const filteredData = manufacturers.filter(item => new Date(item.arrived) <= new Date("2021-04-12")).length

  return (
    <div>
      <div>
        <h2>Vaccinations exercise</h2>
      </div>
      <div>
        <p>Antiqua vaccine (4 injections in 1 bottle)</p>
        <p>SolarBuddhica vaccine (6 injections in 1 bottle)</p>
        <p>Zerpfy vaccine (5 injections in 1 bottle)</p>
      </div>
      <div>
        {/* <p>{filteredData}</p> */}

        <p>Total number of orders {orderSum}.</p>
        <p>Vaccinations done {injectionsDone}.</p>
        <p>{arrivalDay} arrived {arrivedOrdersSum} (61) orders.</p>
        <p>When counted from 2021-04-12 -number- vaccines expired
          before usage (injections in the expiring bottles -number-
          and injections done from the expired bottles -number-)</p>
      </div>
      <div>
        {/* <table>
          <Vaccinations manufacturers={manufacturers} />
        </table> */}
      </div>
    </div>
  )

}

export default App
