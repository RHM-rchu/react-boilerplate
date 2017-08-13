import React from "react"
import { render } from "react-dom"
import { browserHistory, Router, Route, IndexRoute } from "react-router"
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"

import { reducers } from "./reducers/index"
import App from "./components/App"

import './stylesheets/main.scss'

import Index from "./pages/Index"
import ClinicEdit from "./pages/ClinicEdit"
import NotFound from "./pages/NotFound"


/* mock data, need to query db for clinics here */
let clinics = []
for (let i=1; i<=67; i++) {
  clinics.push({
    clinicUid: i,
    clinic: `GRP-${i}`,
    email: `test${i}@test.com`,
    rand: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
  })
}

const initialState = {
  theDatas: {
    list: clinics,
  },
}

// create store
let middleware = applyMiddleware(routerMiddleware(browserHistory))
if(process.env.NODE_ENV !== 'production') {
  middleware = compose(middleware, window.devToolsExtension && window.devToolsExtension())
}
const store = createStore(reducers, initialState, middleware)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="clinic-edit(/:id)" component={ClinicEdit}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
