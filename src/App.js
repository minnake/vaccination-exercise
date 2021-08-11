import React, { useState, useEffect } from 'react'
import vaccinationsSercive from './services/vaccinations'
import antiquaService from './services/antiqua'
import solarBuddhicaService from './services/solarBuddhica'
import zerpfyService from './services/zerpfy'
import './index.css'
import { DateTime } from 'luxon'
import Vaccinations from './components/Vaccinations'

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
    //console.log(date)
    return date
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
    injectionSum: getInjectionSum(item.id),
  }))

  //Total number of Antiqua, SolarBuddhicas and Zerpfies vaccines
  const antiquaTotal = manufacturers.filter(item => item.vaccine === 'Antiqua').length
  const solarBuddhicaTotal = manufacturers.filter(item => item.vaccine === 'SolarBuddhica').length
  const zerpfyTotal = manufacturers.filter(item => item.vaccine === 'Zerpfy').length

  //Total sum of the injections in bottles
  const totalInjectionSum = manufacturers.reduce((acc, value) => acc = acc + value.injections, 0)

  //total sum of orders
  const orderSum = manufacturers.length

  //total sum of injections done
  const injectionsDone = vaccinations.length

  //vaccines that came 2021-03-20 -> right sum is 61
  const arrivalDay = DateTime.fromObject({ year: 2021, day: 20, month: 3 }).toISODate()
  const arrivedOrdersSum = manufacturers.filter(item => arrivalDay === item.arrived.toISODate()).length

  //How many vaccined are females, male and nonbinaries
  const femaleVaccined = vaccinations.filter(item => item.gender === 'female').length
  const maleVaccined = vaccinations.filter(item => item.gender === 'male').length
  const nonVaccined = vaccinations.filter(item => item.gender === 'nonbinary').length

  //check how  many vaccines expired "2021-04-12" => 12590 
  //-> bottle expires in 30 days from arrival
  //-> remaining injections in expired bottles
  //-> injections done from the expired bottles

  //const endDay = DateTime.fromObject({ year: 2021, day: 12, month: 4 }).toISODate()
  /*const result = manufacturers.filter(item => item.arrived.toISODate() >= endDay).length
  console.log(result)

  const expiredVaccines = manufacturers.reduce((acc, value) =>
    value.arrived.toISODate() <= endDay ? acc + value.injections - value.injectionSum : acc, 0)*/

  //total number of bottles not used any injections
  const valueZero = manufacturers.filter(item => item.injectionSum === 0).length

  //bottles that has all vaccines injected => 14
  

  return (
    <div>

      <div>
        <h2>Vaccinations exercise</h2>
      </div>
      {/*<div>
         <p>Antiqua vaccine (4 injections in 1 bottle)</p>
        <p>SolarBuddhica vaccine (6 injections in 1 bottle)</p>
        <p>Zerpfy vaccine (5 injections in 1 bottle)</p> 
      </div>*/}
      <div>
        <div>
          <p>Total number of Antiqua vaccine orders {antiquaTotal} and total number of injections {antiquaTotal * 4}.</p>
          <p>Total number of SolarBuddhica vaccine orders {solarBuddhicaTotal} and total number of injections {solarBuddhicaTotal * 6}.</p>
          <p>Total number of Zerpfy vaccine orders {zerpfyTotal} and total number of injections {zerpfyTotal * 5}.</p>
          <p>Total number of injections {totalInjectionSum}.</p>
          <p>Total number of injections left {totalInjectionSum - injectionsDone}</p>
        </div>
        <div>
          <p>Total number of orders {orderSum}.</p>
          <p>{arrivalDay} arrived {arrivedOrdersSum} orders.</p>
        </div>
        <div>
          <p>Vaccinations done {injectionsDone}.</p>
          <p>Total number of vaccined females {femaleVaccined}.</p>
          <p>Total number of vaccined males {maleVaccined}.</p>
          <p>Total number of vaccined nonbinaries {nonVaccined}.</p>
          <p>Total number of bottles not given any injections {valueZero}.</p>
          <p>Total number of bottles that has used all vaccines.</p>
        </div>
        {/*<div>
           <p>When counted from 2021-04-12 12 590 vaccines expired before usage (injections in the expiring bottles 17 423
          and injections done from the expired bottles 4833)</p> 
          <p>When counted from 2021-04-12 -number- vaccines expired
            before usage (injections in the expiring bottles -number-
            and injections done from the expired bottles -number-)</p>
        </div>*/}
      </div>
      <div>
        <table>
          <Vaccinations manufacturers={manufacturers} />
        </table>
      </div>
    </div>
  )

}

export default App
