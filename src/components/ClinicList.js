import React, { Component } from "react"
import { Table, Pagination, ProgressBar } from "react-bootstrap"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import PropTypes from 'prop-types'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import ClinicListElement from "./ClinicListElement"
import ClinicDelete from "./common/ModalDelete"
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

/**
 *
 * Display Table for Clinics component
 *
 */
class ClinicList extends Component {

  constructor(props) {
    super(props)
    // when no clinics update state with api
    if(0 === this.props.clinics.length) {
      this.props.dispatch({
        type: 'clinicFetchList'
      })
    }

    this.options = {
      defaultSortName: 'clinic',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    }
    // bind <this> to all event methods
    this.changePage = this.changePage.bind(this)
  }

  render() {
    const per_page = Number(process.env.LIMIT_PER_PAGE) || 15
    const pages = Math.ceil(this.props.clinics.length/per_page)
    const current_page = this.props.page
    const start_offset = (current_page - 1) * per_page
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '20', value: 20
      }, {
        text: '50', value: 50
      }, {
        text: 'All', value: this.props.clinics.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: per_page,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 4,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      // hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true, // Always show next and previous button
      withFirstAndLast: true, //> Hide the going to First and Last page button
      // clearSearch: true,
      // clearSearchBtn: this.createCustomClearButton,
      // deleteBtn: this.handleDeleteButtonClick,
    }
    const selectRow = {
      mode: 'checkbox'
    }
    if(this.props.clinics.length) {
      // show clinics list
      return (
        <div>

        <BootstrapTable ref='table' data={ this.props.clinics } selectRow={ selectRow } deleteRow striped hover condensed search pagination={ true } options={options}>
            <TableHeaderColumn dataField='clinicUid' isKey={ true } dataSort={ true } width="100">clinicUid</TableHeaderColumn>
            <TableHeaderColumn dataField='clinic' dataSort={ true }>clinic</TableHeaderColumn>
            <TableHeaderColumn dataField='email' dataSort={ true }>email</TableHeaderColumn>
            <TableHeaderColumn dataField='rand' dataSort={ true }>rand</TableHeaderColumn>
        </BootstrapTable>



          <ClinicDelete/>

        </div>
      )
    } else {
      return (
        <ProgressBar active now={100}/>
      )
    }
  }


  // chnage the current page
  changePage(page) {
    this.props.dispatch(push('?page=' + page))
  }

}


function mapStateToProps(state) {
  return ({
    clinics: state.theDatas.list || [],
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1
  })
}


ClinicList.propTypes = {
  clinics: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}


export default connect(mapStateToProps)(ClinicList)
