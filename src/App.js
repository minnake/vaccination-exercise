import React, { useState, useEffect } from 'react'
import vaccinationsSercive from './services/vaccinations'
import antiquaService from './services/antiqua'
import solarBuddhicaService from './services/solarBuddhica'
import zerpfyService from './services/zerpfy'
import './index.css'
//import moment from 'moment'
import { DateTime } from 'luxon'
import Vaccinations from './components/Vaccinations'
//import { orderBy } from 'lodash'

const App = () => {
  const [vaccinations, setVaccinations] = useState([])
  const [antiqua, setAntiqua] = useState([])
  const [solarBuddhica, setSolarBuddhica] = useState([])
  const [zerpfy, setZerpfy] = useState([])

  useEffect(() => {
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

  //format date to form YYYY-MM-DD. Right now formatted to dd.mm.yyyy
  const formatDate = (value) => {
    const date = DateTime.fromISO(value).toUTC()
    //const formatDate = date.minus({ hours: 2 }).setLocale('fi').toLocaleString(DateTime.DATE_SHORT)
    //console.log(date)
    return date
    //moment(value).format('YYYY-MM-DD')
  }

  /*compare manufacturers.id to vaccinations.sourceBottle and count, how many times
  id is found and store the sum in injectionSum*/
  const getInjectionSum = (id) => {
    const injectionSum = vaccinations.filter(item => id === item.sourceBottle).length
    return injectionSum
  }

  //join Antiqua, SolarBuddhica and Zerpfy arrays to one
  const manufacturers = [...antiqua, ...solarBuddhica, ...zerpfy].map(item => ({
    ...item,
    arrived: formatDate(item.arrived),
    injectionSum: getInjectionSum(item.id)
  }))

  //console.log(manufacturers)

  //total sum of orders
  const orderSum = manufacturers.length

  //total sum of injections done
  const injectionsDone = vaccinations.length

  //vaccines that came 2021-03-20 -> right sum is 61
  const arrivalDay = DateTime.fromObject({year: 2021, day:20, month:3}).toISODate()
  //console.log(arrivalDay)
  const arrivedOrdersSum = manufacturers.filter(item => arrivalDay === item.arrived.toISODate()).length

  //sum of the all injections in bottle -> 25015
  /*const totalVaccinesBottle = manufacturers.reduce((total, value) => total = total + value.injections, 0)
  console.log(totalVaccinesBottle) */

  //check how  many vaccines expired "2021-04-12"
  //-> bottle expires in 30 days from arrival
  //-> remaining injections in expired bottles
  //-> injections done from the expired bottles
  // const startDay = '1.1.2021'
  /*const endDay = '13.3.2021'

   const result = manufacturers.filter(item => item.arrived <= endDay).length
  console.log(result)*/

  /*const expiredVaccines = manufacturers.reduce((acc, value) =>
    value.arrived <= endDay ? acc + value.injections : acc, 0)

  console.log(expiredVaccines)*/


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
        <p>{arrivalDay} arrived {arrivedOrdersSum} orders.</p>
        {/* <p>When counted from 2021-04-12 12 590 vaccines expired before usage (injections in the expiring bottles 17 423
          and injections done from the expired bottles 4833)</p> */}
        <p>When counted from 2021-04-12 -number- vaccines expired
          before usage (injections in the expiring bottles -number-
          and injections done from the expired bottles -number-)</p>
      </div>
      <div>
        <table>
          {/* <Vaccinations manufacturers={orderBy(manufacturers, ['arrived'])} */}
          <Vaccinations manufacturers={manufacturers} />
        </table>
      </div>
    </div>
  )

}

export default App
