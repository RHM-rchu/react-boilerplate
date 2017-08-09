import React from "react"
import Menu from "./common/Menu"
import PropTypes from 'prop-types'

/**
 *
 * List Clinics
 *
 */
export default class App extends React.Component {


  static get propTypes() {
    return {
      children: PropTypes.any,
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className="container">
        <div className="row">
          <Menu/>
        </div>
        <div className="row">
          {children}
        </div>
      </div>
    )
  }


}

