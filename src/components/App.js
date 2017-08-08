import React from "react"
import Menu from "./common/Menu"

/**
 *
 * List Clinics
 *
 */
export default class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <Menu/>
        </div>
        <div className="row">
          {this.props.children}
        </div>
      </div>
    )
  }

  // static get propTypes() {
  //   return {
  //     children: PropTypes.any,
  //   }
  // }

}

