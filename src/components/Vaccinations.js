import React from 'react'

const Vaccinations = ({ passedValue }) => {
    //console.log(vaccinations.map(item => item))
    return (
        <tbody>
            {passedValue.map(({ id, vaccine, arrived }) => {
                return (
                    <tr key={id}>
                        <td>{vaccine}</td>
                        <td>{arrived}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Vaccinations