import React from 'react'
import { DateTime } from 'luxon'

const Vaccinations = ({ vaccinations }) => {
    return (
        <tbody>
            <tr>
                {/* <th>ID</th> */}
                <th>Source Bottle ID</th>
                <th>Gender</th>
                <th>Vaccination date</th>
            </tr>
            {vaccinations.map(({ id, sourceBottle, gender, vaccinationDate }) => {
                return (
                    <tr key={id}>
                        {/* <td>{id}</td> */}
                        <td>{sourceBottle}</td>
                        <td>{gender}</td>
                        <td>{DateTime.fromISO(vaccinationDate).setLocale('fi').toLocaleString(DateTime.DATE_SHORT)}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default Vaccinations