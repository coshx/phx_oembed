import "phoenix_html";
import "babel-polyfill";
import React                            from "react";
import ReactDOM                         from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider }                     from "react-redux";
import thunk                            from "redux-thunk";
import createLogger                     from "redux-logger";
import { Router, Route, hashHistory }   from "react-router";
import appReducer                       from "./reducers/app_reducer";
import AppContainer                     from "./containers/app_container";
import AuthenticatedContainer           from "./containers/authenticated_container";
import SignInContainer                  from "./containers/sign_in_container";

const logger = createLogger();
const store = createStore(appReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="sites" component={AuthenticatedContainer} />
        <Route path="sign_in" component={SignInContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app-container")
);
