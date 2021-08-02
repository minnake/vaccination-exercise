import React from 'react'

const Vaccinations = ({ manufacturers }) => {
    //console.log(vaccinations.map(item => item))
    return (
        <tbody>
            <tr>
                <th>Id</th>
                <th>Manufacturer name</th>
                <th>Bottle arrived</th>
                <th>Injections in bottle</th>
                <th>Used injections</th>
            </tr>
            {manufacturers.map(({ id, vaccine, arrived, injections, injectionSum  }) => {
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{vaccine}</td>
                        <td>{arrived}</td>
                        <td>{injections}</td>
                        <td>{injectionSum}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Vaccinations