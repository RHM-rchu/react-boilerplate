/**
 *
 * API static class
 *
 */

export default class apiClinics {

  /* mock data, need to query db for clinics here */
  static getList(action) {

    return fetch(`${process.env.API_SERVER_HOST}:${process.env.API_SERVER_PORT}/api/users`, {
      method: 'get',
      mode: 'cors',
      redirect: 'follow',
    })
      .then(res => res.json())
      .then( function(clinics) {
        // console.log(clinics)
        // validate data later
        return clinics
      })
      .catch( function(e) {
        return {
          status: 'error API connection'
        }
      })

  }
}


