import React from "react"
import PropTypes from 'prop-types'
import ClinicListElement from "./ClinicListElement"

/**
 *
 * Display User component
 *
 */
export default class ClinicList extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>clinicUid</th>
            <th>clinics</th>
            <th>email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.props.clinics.map( (clinic, index) => {
            return (
              <ClinicListElement key={clinic.clinicUid} clinic={clinic}/>
            )
          })}
        </tbody>
      </table>
    )
  }
}
// prop checks
ClinicList.propTypes = {
  clinics: PropTypes.array.isRequired,
}
