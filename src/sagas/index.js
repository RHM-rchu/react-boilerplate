import { takeLatest }  from 'redux-saga'
import { fork }  from 'redux-saga/effects'
import { clinicFetchList }  from './clinics'
/**
 *
 * Main saga generator
 *
 */

export function* sagas() {
  yield [
    // takeLatest: stop query if in progress to make new
    fork(takeLatest, 'clinicFetchList', clinicFetchList),
  ]
}
