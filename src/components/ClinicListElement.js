import React from "react"
import PropTypes from 'prop-types'

/**
 *
 * Display User list
 *
 */
export default class ClinicListElement extends React.Component {
  render() {
    const clinic = this.props.clinic
    return (
      <tr>
        <td>{clinic.clinicUid}</td>
        <td>{clinic.clinic}</td>
        <td>{clinic.email}</td>
        <td><a href={'/clinic/' + clinic.clinicUid}>Edit</a></td>
        <td><button data-id={clinic.clinicUid}>Delete</button></td>
      </tr>
    )
  }
}
// prop checks
ClinicListElement.propTypes = {
  clinic: PropTypes.object.isRequired,
}
