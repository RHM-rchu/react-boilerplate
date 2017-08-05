import React from "react"





export default class app extends React.Component {
  render() {
    /* need to query db for clinics here */
    const clinics = []
    for (let i=1; i<10; i++) {
      clinics.push({
        clinicUid: i,
        clinic: `GRP-${i}`,
        email: `test${i}@test.com`
      })
    }

    return (
      <table>
        <thead>
          <tr>
            <th>clinicUid</th>
            <th>clinics</th>
            <th>email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map( (clinic, index) => {
            return (
              <tr key={clinic.clinicUid}>
                <td>{clinic.clinicUid}</td>
                <td>{clinic.clinic}</td>
                <td>{clinic.email}</td>
                <td><a href={'/clinic/' + clinic.clinicUid}>Edit</a></td>
                <td><button data-id={clinic.clinicUid}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

}
