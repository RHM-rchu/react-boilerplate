import React from "react"
import ClinicList from "./ClinicList"


/**
 *
 * List users
 *
 */
export default class app extends React.Component {
  /**
   *
   * Constructor
   *
   * @param props
   */
  constructor(props) {
    super(props)

    /* need to query db for clinics here */
    const clinics = []
    for (let i=1; i<10; i++) {
      clinics.push({
        clinicUid: i,
        clinic: `GRP-${i}`,
        email: `test${i}@test.com`
      })
    }

    this.state = {
      clinics: clinics,
    }

  }


  render() {
    return (
      <ClinicList clinics={this.state.clinics}/>
    )
  }

}
