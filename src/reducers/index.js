import { combineReducers } from "redux"
import commonModal from "./commonModal"


/**
 *
 * reducers
 *
 */
export const reducers = combineReducers({
  theDatas: commonModal,
})

export function reducerCall(state = {}, action, reducerClass) {

  const [, method] = action.type.split('.')
  // get all class methods
  const methods = Object.getOwnPropertyNames(reducerClass).filter( name => {
    if('length' !== name && 'name' !== name && 'prototype' !== name) {
      return name
    }
  })

  // check is action method exists in static class
  if (methods.find( x => x === method)) {
    // const newState = Object.assign({}, state);
    const newState = JSON.parse(JSON.stringify(state))
    return reducerClass[method](newState, action)
  } else {
    // no valid action
    return state
  }
}

