import React, { Component } from "react"
import { Table, Pagination } from "react-bootstrap"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import PropTypes from 'prop-types'

import ClinicListElement from "./ClinicListElement"
import ClinicDelete from "./common/ModalDelete"

/**
 *
 * Display Table for Clinics component
 *
 */
class ClinicList extends Component {

  constructor(props) {
    super(props)

    // bind <this> to all event methods
    this.changePage = this.changePage.bind(this)
  }

  render() {
    const per_page = process.env.LIMIT_PER_PAGE || 15
    const pages = Math.ceil(this.props.clinics.length/per_page)
    const current_page = this.props.page
    const start_offset = (current_page - 1) * per_page
    let start_count = 0

    return (
      <div>
        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>clinicUid </th>
              <th>clinics</th>
              <th>email</th>
              <th>sites</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.clinics.map( (clinic, index) => {
              if(index >= start_offset && start_count< per_page) {
                start_count++
                return (
                  <ClinicListElement key={clinic.clinicUid} clinic={clinic}/>
                )
              }
            })}
          </tbody>
        </Table>

        <Pagination className="clinic-pagination pull-right" bsSize="medium" maxButtons={parseInt(process.env.LIMIT_PER_PAGE)||10} first last next prev boundaryLinks items={pages} activePage={current_page} onSelect={this.changePage}>
        </Pagination>

        <ClinicDelete/>

      </div>
    )
  }


  // chnage the current page
  changePage(page) {
    this.props.dispatch(push('?page=' + page))
  }

}


function mapStateToProps(state) {

  return ({
    clinics: state.theDatas.list,
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1
  })
}


ClinicList.propTypes = {
  clinics: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}


export default connect(mapStateToProps)(ClinicList)
