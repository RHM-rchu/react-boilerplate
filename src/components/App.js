import React from "react"
import ClinicList from "./ClinicList"


/**
 *
 * List Clinics
 *
 */
export default class app extends React.Component {

  render() {
    return (
      <div className="container">
        <ClinicList />
      </div>
    )
  }

}
