import React from 'react'

const Vaccinations = ({ manufacturers }) => {
    //console.log(vaccinations.map(item => item))
    return (
        <tbody>
            {manufacturers.map(({ id, vaccine, arrived }) => {
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