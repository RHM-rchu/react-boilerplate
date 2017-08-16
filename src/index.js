import React from "react"
import { render } from "react-dom"
import { browserHistory, Router, Route, IndexRoute } from "react-router"
import { syncHistoryWithStore, routerMiddleware } from "react-router-redux"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware  from "redux-saga"

import App from "./components/App"
import { reducers } from "./reducers/index"
import { sagas } from "./sagas/index"

import './stylesheets/main.scss'

import Index from "./pages/Index"
import ClinicEdit from "./pages/ClinicEdit"
import NotFound from "./pages/NotFound"


const sagaMiddleware = createSagaMiddleware()



// create store
let middleware = applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)
if(process.env.NODE_ENV !== 'production') {
  middleware = compose(middleware, window.devToolsExtension && window.devToolsExtension())
}
const store = createStore(reducers, middleware)
const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(sagas)


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
