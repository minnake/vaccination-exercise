import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { DateTime } from 'luxon'
import { CircularProgress } from '@material-ui/core'
import getAll from './services/getAll'
import Cards from './components/Cards'
import FactsCards from './components/FactsCard'

//these two lower imports are for testing purposes
//import Vaccinations from './components/Vaccinations'
//import Manufacturers from './components/Manufacturers'

const App = () => {
  const [vaccinations, setVaccinations] = useState([])
  const [antiqua, setAntiqua] = useState([])
  const [solarBuddhica, setSolarBuddhica] = useState([])
  const [zerpfy, setZerpfy] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      await getAll("vaccinations")
        .then(initialVaccinations => {
          setVaccinations(initialVaccinations)
        }).catch(error => { setError(error) })
      await getAll("antiquas")
        .then(initialVaccinations => {
          setAntiqua(initialVaccinations)
        }).catch(error => { setError(error) })
      await getAll("solarbuddhicas")
        .then(initialVaccinations => {
          setSolarBuddhica(initialVaccinations)
        }).catch(error => { setError(error) })
      await getAll("zerpfies")
        .then(initialVaccinations => {
          setZerpfy(initialVaccinations)
        }).catch(error => { setError(error) })
      setIsLoaded(true)
    })()
  })

  //format date
  const formatDate = (value) => {
    const date = DateTime.fromISO(value).toUTC()
    return date
  }

  //compare manufacturers.id to vaccinations.sourceBottle and count, how many times
  //id is found and store the sum in injectionSum
  const getInjectionSum = (id) => {
    const injectionSum = vaccinations.filter(item => id === item.sourceBottle).length
    return injectionSum
  }

  //join Antiqua, SolarBuddhica and Zerpfy arrays to one array (manufacturers)
  const manufacturers = [...antiqua, ...solarBuddhica, ...zerpfy].map(item => ({
    ...item,
    arrived: formatDate(item.arrived),
    injectionSum: getInjectionSum(item.id),
  }))

  if (!isLoaded) {
    return <div id="circularProgress"><CircularProgress size={100} style={{ 'color': 'lightblue' }} /></div>
  }

  if (error) {
    return <div><p>{error}</p></div>
  }

  return (

    <div className="container">
      <h2>VACCINATION EXCERCISE</h2>
      <hr />

      <Cards manufacturers={manufacturers} />
      <FactsCards manufacturers={manufacturers} vaccinations={vaccinations} />

      {/*<div className="tableDiv">
          <table>
            <Vaccinations vaccinations={vaccinations} />
          </table>
        </div>

        <div className="tableDiv">
          <table>
            <Manufacturers manufacturers={manufacturers} />
          </table>
        </div>*/}
    </div>


  )
}

export default App
