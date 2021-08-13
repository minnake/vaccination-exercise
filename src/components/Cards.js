import React from 'react'

const Cards = ({ manufacturers }) => {

  //Total number of Antiqua vaccines
  const antiquaTotal = manufacturers.filter(item => item.vaccine === 'Antiqua').length

  //Total number of SolarBuddhica vaccines
  const solarBuddhicaTotal = manufacturers.filter(item => item.vaccine === 'SolarBuddhica').length

  //Total number of Zerpfy vaccines
  const zerpfyTotal = manufacturers.filter(item => item.vaccine === 'Zerpfy').length

  return (
    <div className="card-group">
      <div className="card border">
        <h5 className="card-title">ANTIQUA</h5>
        <div className="card-body">
          <ul>
            <li>Total number of orders: {antiquaTotal}</li>
            <li>Total sum of injections: {antiquaTotal * 4}</li>
          </ul>
        </div>
      </div>

      <div className="card border">
        <h5 className="card-title">SOLARBUDDHICA</h5>
        <div className="card-body">
          <ul>
            <li>Total number of orders: {solarBuddhicaTotal}</li>
            <li>Total sum of injections: {solarBuddhicaTotal * 6}</li>
          </ul>
        </div>
      </div>

      <div className="card border">
        <h5 className="card-title">ZERPFY</h5>
        <div className="card-body">
          <ul>
            <li>Total number of orders: {zerpfyTotal}</li>
            <li>Total sum of injections: {zerpfyTotal * 5}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards