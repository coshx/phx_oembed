import "phoenix_html";
import React                          from "react";
import ReactDOM                       from "react-dom";
import appReducer                     from "./reducers/app_reducer";
import { createStore }                from "redux";
import { Provider }                   from "react-redux";
import { Router, Route, hashHistory } from "react-router";
import AppContainer                   from "./containers/app_container";
import SitesContainer                 from "./containers/sites_container";
import SignInContainer                from "./containers/sign_in_container";

ReactDOM.render(
  <Provider store={createStore(appReducer)}>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer}>
        <Route path="sites" component={SitesContainer} />
        <Route path="sign_in" component={SignInContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app-container")
);
