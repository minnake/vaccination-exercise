import React from 'react'
import { DateTime } from 'luxon'

const Manufacturers = ({ manufacturers }) => {
    return (
        <tbody>
            <tr>
                {/* <th>ID</th> */}
                <th>Manufacturer name</th>
                <th>Bottle arrived</th>
                <th>Injections in bottle</th>
                <th>Used injections</th>
                <th>Injections left in bottle</th>
            </tr>
            {manufacturers.map(({ id, vaccine, arrived, injections, injectionSum }) => {
                return (
                    <tr key={id}>
                        {/* <td>{id}</td> */}
                        <td>{vaccine}</td>
                        <td>{DateTime.fromISO(arrived).setLocale('fi').toLocaleString(DateTime.DATE_SHORT)}</td>
                        <td>{injections}</td>
                        <td>{injectionSum}</td>
                        <td>{injections - injectionSum}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Manufacturers