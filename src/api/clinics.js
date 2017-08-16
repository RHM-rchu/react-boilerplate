/**
 *
 * API static class
 *
 */

export default class apiClinics {

  /* mock data, need to query db for clinics here */
  static getList(action) {
    // timeout after 1 sec
    const timeout = 1000
    // async wit promise: todo make api call
    return new Promise(resolve => {
      setTimeout(() => {
        let clinics = []
        for (let i=1; i<=67; i++) {
          clinics.push({
            clinicUid: i,
            clinic: `GRP-${i}`,
            email: `test${i}@test.com`,
            rand: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
          })
        }
        resolve(clinics)
      }, timeout)
    })
  }
}


