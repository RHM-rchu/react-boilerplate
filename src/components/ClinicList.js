import React from "react"
import { connect } from "react-redux"
import { Table } from "react-bootstrap"
import PropTypes from 'prop-types'
import ClinicListElement from "./ClinicListElement"

/**
 *
 * Display Table for Clinics component
 *
 */
class ClinicList extends React.Component {
  render() {
    return (
      <Table bordered hover responsive striped>
        <thead>
          <tr>
            <th>clinicUid</th>
            <th>clinics</th>
            <th>email</th>
            <th>sites</th>
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
      </Table>
    )
  }
}



function mapStateToProps(state) {
  ClinicList.propTypes = {
    clinics: PropTypes.array.isRequired,
  }
  return ({
    clinics: state.clinics
  })
}

export default connect(mapStateToProps)(ClinicList)
