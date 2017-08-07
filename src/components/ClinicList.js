import React from "react"
import { connect } from "react-redux"
import { Table } from "react-bootstrap"
import PropTypes from 'prop-types'

import ClinicListElement from "./ClinicListElement"
import ClinicDelete from "./common/ModalDelete"

/**
 *
 * Display Table for Clinics component
 *
 */
class ClinicList extends React.Component {
  render() {
    return (
      <div>
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

        <ClinicDelete/>

      </div>
    )
  }
}


function mapStateToProps(state) {

  return ({
    clinics: state.theDatas.list,
  })
}


ClinicList.propTypes = {
  clinics: PropTypes.array.isRequired,
}


export default connect(mapStateToProps)(ClinicList)
