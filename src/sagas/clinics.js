import { call, put } from 'redux-saga/effects'
import APIClinics from '../api/clinics'

/**
 *
 * Fetch clinics list
 *
 */

export function* clinicFetchList(action){

  // call the api to get clinics
  const clinics = yield call(APIClinics.getList)
  // dispatch the success action with clinics
  yield put({
    type: 'clinics.fetchListSuccess',
    theDatas: clinics,
  })
}
