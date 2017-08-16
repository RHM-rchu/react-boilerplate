import { reducerCall } from './index'


/**
 *
 * reducer
 * Clinic reducers can only use functions
 *
 */
export default function commonModal(state = {}, action){
  return reducerCall(state, action, reducerClass)
}



/**
 *
 * reducer static class
 *
 */
const reducerClass = {
  /**
   *
   * Show Modal
   *
   * @param newState
   * @param action
   * @returns
   *
   */
  modalDeleteShow: function(newState, action) {
    newState.modal = newState.modal || {}
    newState.modal.listDelete = {
      show: true,
      component: action.component,
      id: action.id,
      name: action.name,
      message: action.message,
    }
    return newState
  },
  /**
   *
   * HIDE Modal
   *
   * @param newState
   * @param action
   * @returns
   *
   */
  modalDeleteHide: function(newState, action) {
    newState.modal.listDelete = {
      show: false,
      component: '',
      id: 0,
      name: '',
      message: '',
    }
    return newState
  },
  /**
   *
   * Delete
   *
   * @param newState
   * @param action
   * @returns
   *
   */
  modalClinicDelete: function(newState, action) {
    /**
     *
     * need to hook this into the db delete
     *
     */
    for (const index in newState.list) {
      if(newState.list[index].clinicUid === action.id) {
        newState.list.splice(index, 1)
        break
      }
    }
    return newState
  },
  /**
   *
   * Add a Clinic
   *
   */
  Add: function(newState, action) {
    const id = Math.floor((Math.random() * 345345))
    // add the clinic to
    newState.list.push({
      clinicUid: id,
      clinic: action.clinic,
      email: action.email,
      rand: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
    })
    return newState
  },
  /**
   *
   * Edit a Clinic
   *
   */
  Edit: function(newState, action) {
    for (const clinic of newState.list) {
      if(clinic.clinicUid === action.clinicUid) {
        Object.assign(clinic, {
          clinicUid: action.clinicUid,
          clinic: action.clinic,
          email: action.email,
          rand: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
        })
        break
      }
    }
    return newState
  },
  /**
   *
   * Clinics list saga fetch was successful
   *
   */

  fetchListSuccess: function(newState, action) {
    newState.list = action.theDatas
    return newState
  }
}


