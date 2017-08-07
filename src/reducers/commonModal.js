
/**
 *
 * reducer
 * reducers can only use funtions
 *
 */
export default function commonModal(state = {}, action){
  let newState
  switch(action.type) {
    case 'modal.modealDeleteShow':
      // clone state
      newState = JSON.parse(JSON.stringify(state))
      newState.modal = newState.modal || {}
      newState.modal.listDelete = {
        show: true,
        component: action.component,
        id: action.id,
        name: action.name,
        message: action.message,
      }
      return newState
    case 'modal.modalDeleteHide':
      newState = JSON.parse(JSON.stringify(state))
      newState.modal.listDelete = {
        show: false,
        component: '',
        id: 0,
        name: '',
        message: '',
      }
      return newState
    case 'modal.modalClinicDelete':
      newState = JSON.parse(JSON.stringify(state))
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
    default:
      return state
  }
}
