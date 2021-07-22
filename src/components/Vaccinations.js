import React from 'react'

const Vaccinations = ({ vaccinations }) => {
    //console.log(vaccinations.map(item => item))
    return (
        <tbody>
            {vaccinations.map(({ id, vaccinationDate }) => {
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{vaccinationDate}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Vaccinations