import React from 'react'
import { DateTime } from 'luxon'

const FactsCards = ({ manufacturers, vaccinations }) => {

    //Total sum of the injections in bottles
    const totalInjectionSum = manufacturers.reduce((acc, value) => acc = acc + value.injections, 0)

    //total sum of orders
    const orderSum = manufacturers.length

    //total sum of injections done
    const injectionsDone = vaccinations.length

    //vaccines that came 2021-03-20 -> right sum is 61
    const arrivalDay = DateTime.fromObject({ year: 2021, day: 20, month: 3 }).toISODate()
    const arrivedOrdersSum = manufacturers.filter(item => arrivalDay === item.arrived.toISODate()).length

    //total number of vaccinated by gender
    const femaleVaccined = vaccinations.filter(item => item.gender === 'female').length
    const maleVaccined = vaccinations.filter(item => item.gender === 'male').length
    const nonVaccined = vaccinations.filter(item => item.gender === 'nonbinary').length

    //total numbers of bottle with no injections done
    const valueZero = manufacturers.filter(item => item.injectionSum === 0).length

    return (
        <div className="card-group">

            <div className="card"></div>

            <div className="card border">
                <h5 className="card-title">FACTS ABOUT VACCINATIONS</h5>
                <div className="card-body">
                    <ul>
                        <li>Total number of orders: {orderSum}</li>
                        <li>Total number of vaccinations done: {injectionsDone}</li>
                        <li>{arrivalDay} arrived {arrivedOrdersSum} orders</li>
                    </ul>
                    <ul>
                        <li>Females vaccinated: {femaleVaccined}</li>
                        <li>Males vaccinated: {maleVaccined}</li>
                        <li>Nonbinaries vaccinated: {nonVaccined}</li>
                    </ul>
                    <ul>
                        <li>Total number of injections: {totalInjectionSum}</li>
                        <li>Total number of injections left: {totalInjectionSum - injectionsDone}</li>
                        <li>Bottles that has not injected any vaccine: {valueZero}</li>
                    </ul>
                </div>
            </div>

            <div className="card"></div>
        </div>

    )
}

export default FactsCards