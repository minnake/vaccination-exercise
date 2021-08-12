import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import vaccinationsSercive from './services/vaccinations'
import antiquaService from './services/antiqua'
import solarBuddhicaService from './services/solarBuddhica'
import zerpfyService from './services/zerpfy'
import './index.css'
import { DateTime } from 'luxon'
import Vaccinations from './components/Vaccinations'
import Loading from './components/Loading'
import Clock from './components/Clock'

const App = () => {
  const [vaccinations, setVaccinations] = useState([])
  const [antiqua, setAntiqua] = useState([])
  const [solarBuddhica, setSolarBuddhica] = useState([])
  const [zerpfy, setZerpfy] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2500);

    (async () => {
      await vaccinationsSercive
        .getAll()
        .then(initialVaccinations => {
          setVaccinations(initialVaccinations)
        })
      await antiquaService
        .getAll()
        .then(initialVaccinations => {
          setAntiqua(initialVaccinations)
        })
      await solarBuddhicaService
        .getAll()
        .then(initialVaccinations => {
          setSolarBuddhica(initialVaccinations)
        })
      await zerpfyService
        .getAll()
        .then(initialVaccinations => {
          setZerpfy(initialVaccinations)
        })
    })()
  })


  //format date
  const formatDate = (value) => {
    const date = DateTime.fromISO(value).toUTC()
    //console.log(date)
    return date
  }

  /*compare manufacturers.id to vaccinations.sourceBottle and count, how many times
  id is found and store the sum in injectionSum*/
  const getInjectionSum = (id) => {
    const injectionSum = vaccinations.filter(item => id === item.sourceBottle).length
    return injectionSum
  }

  //join Antiqua, SolarBuddhica and Zerpfy arrays to one array
  const manufacturers = [...antiqua, ...solarBuddhica, ...zerpfy].map(item => ({
    ...item,
    arrived: formatDate(item.arrived),
    injectionSum: getInjectionSum(item.id),
  }))

  //Total number of Antiqua, SolarBuddhicas and Zerpfies vaccines
  const antiquaTotal = manufacturers.filter(item => item.vaccine === 'Antiqua').length
  const solarBuddhicaTotal = manufacturers.filter(item => item.vaccine === 'SolarBuddhica').length
  const zerpfyTotal = manufacturers.filter(item => item.vaccine === 'Zerpfy').length

  //Total sum of the injections in bottles
  //const totalInjectionSum = manufacturers.reduce((acc, value) => acc = acc + value.injections, 0)

  //total sum of orders
  const orderSum = manufacturers.length

  //total sum of injections done
  //const injectionsDone = vaccinations.length

  //vaccines that came 2021-03-20 -> right sum is 61
  const arrivalDay = DateTime.fromObject({ year: 2021, day: 20, month: 3 }).toISODate()
  const arrivedOrdersSum = manufacturers.filter(item => arrivalDay === item.arrived.toISODate()).length

  //How many vaccined are females, male and nonbinaries
  const femaleVaccined = vaccinations.filter(item => item.gender === 'female').length
  const maleVaccined = vaccinations.filter(item => item.gender === 'male').length
  const nonVaccined = vaccinations.filter(item => item.gender === 'nonbinary').length

  //numbers of bottle with no injections done
  const valueZero = manufacturers.filter(item => item.injectionSum === 0).length

  //bottles that has all vaccines injected => 14

  return (
    <div>
      <div>
        {isLoading === true ?
          < Loading /> : <Clock />
        }
      </div>
      <div>
        <h2>VACCINATION EXCERCISE</h2>
        <hr />
      </div>
      <div className="card-group">
        <div className="card border">
          <div className="card-body">
            <h5 className="card-title">ANTIQUA</h5>
            <div className="card-body">
              <ul>
                <li>Total number of orders: {antiquaTotal}</li>
                <li>Total sum of injections: {antiquaTotal * 4}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card border">
          <div className="card-body">
            <h5 className="card-title">SOLARBUDDHICA</h5>
            <div className="card-body">
              <ul>
                <li>Total number of orders: {antiquaTotal}</li>
                <li>Total sum of injections: {solarBuddhicaTotal * 6}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card border">
          <div className="card-body">
            <h5 className="card-title">ZERPFY</h5>
            <div className="card-body">
              <ul>
                <li>Total number of orders: {zerpfyTotal}</li>
                <li>Total sum of injections: {zerpfyTotal * 5}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card-group singleCard">
        <div className="card border">
          <div className="card-body">
            <h5 className="card-title">FACTS ABOUT VACCINATIONS</h5>
            <div className="card-body"></div>
            <ul>
              <li>Total number of orders: {orderSum}</li>
              {/* <li>Total number of vaccinations done: {injectionsDone}</li> */}
              <li>{arrivalDay} arrived {arrivedOrdersSum} orders</li>
            </ul>
            <ul>
              <li>Females vaccinated: {femaleVaccined}</li>
              <li>Males vaccinated: {maleVaccined}</li>
              <li>Nonbinaries vaccinated: {nonVaccined}</li>
            </ul>
            <ul>
              <li>Bottles that has not injected any vaccine: {valueZero}</li>
              <li>Total number of bottles that has used all vaccines: </li>
            </ul>
            <ul>
              {/* <li>Total number of injections: {totalInjectionSum}</li> */}
              {/* <li>Total number of injections left: {totalInjectionSum - injectionsDone}</li> */}
            </ul>
          </div>
        </div>
      </div>
     <div className="container">
        <table>
          <Vaccinations manufacturers={manufacturers} />
        </table>
      </div> 
    </div>
  )

}

export default App
