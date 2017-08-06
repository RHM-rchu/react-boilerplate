import React from "react"
import PropTypes from 'prop-types'
import { Button, Glyphicon } from "react-bootstrap"

/**
 *
 * return Clinic row
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
        <td>{clinic.rand}</td>
        <td>
          <a href={'/clinic/' + clinic.clinicUid}>
          <Button bsSize="xsmall">
          Edit <Glyphicon glyph="edit"/>
          </Button>
          </a>
        </td>
        <td>
          <Button bsSize="xsmall" data-id={clinic.clinicUid} data-clinicuid={clinic.clinicUid}>
          Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>
    )
  }
}
// prop checks
ClinicListElement.propTypes = {
  clinic: PropTypes.object.isRequired,
}
