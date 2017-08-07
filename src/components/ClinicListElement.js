import React from "react"
import PropTypes from 'prop-types'
import { Button, Glyphicon } from "react-bootstrap"
import { connect } from "react-redux"
/**
 *
 * return Clinic row
 *
 */
class ClinicListElement extends React.Component {

  constructor(props) {
    super(props)
    /**
     *
     * bind `this` object to new instance `this.modalDeleteShow`
     *  to pass the onclick method in the `render()` below
     *
     */
    this.modalDeleteShow = this.modalDeleteShow.bind(this)
  }
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
          <Button bsSize="xsmall" data-clinicuid={clinic.clinicUid} data-clinic={clinic.clinic} onClick={this.modalDeleteShow}>
          Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>
    )
  }


  /**
 *
 * Prompt to delete Clinic:
 *  onClick action from `render()`
 *  dispatch values
 *
 */
  modalDeleteShow(event) {
    const clinicUid = Number(event.target.dataset.clinicuid)
    const clinic = event.target.dataset.clinic
    this.props.dispatch({
      type: 'modal.modealDeleteShow',
      component: 'Clinic',
      id: clinicUid,
      name: clinic,
      message: 'Are you sure you want to delete this Clinic',
    })
  }

}

// prop checks
ClinicListElement.propTypes = {
  clinic: PropTypes.object.isRequired,
}



export default connect()(ClinicListElement)
