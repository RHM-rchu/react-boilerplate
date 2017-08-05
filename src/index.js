import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { reducers } from "./reducers/index"
import App from "./components/App"


/* need to query db for clinics here */
let clinics = []
for (let i=1; i<=10; i++) {
  clinics.push({
    clinicUid: i,
    clinic: `GRP-${i}`,
    email: `test${i}@test.com`,
    rand: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
  })
}

const initialState = {
  clinics: clinics,
}

const store = createStore(reducers, initialState)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
