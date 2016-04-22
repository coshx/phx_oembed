import Constants              from "../constants";
import Utils                  from "../utils";
import Pages                  from "../pages";
import { hashHistory }        from "react-router";
import * as requestActions    from "./request";
import * as flashActions      from "./flash";

export function newSessionSuccess(user) {
  return {
    type: Constants.ACTIONS.NEW_SESSION_SUCCESS,
    recievedAt: Date.now(),
    user: user
  }
}

export function newSessionFailure(msg) {
  return {
    type: Constants.ACTIONS.NEW_SESSION_FAILURE,
    sentAt: Date.now(),
    msg: msg
  }
}

export function destroySessionRequest() {
  return {
    type: Constants.ACTIONS.DESTROY_SESSION_REQUEST,
    sentAt: Date.now()
  }
}

export function destroySessionSuccess() {
  return {
    type: Constants.ACTIONS.DESTROY_SESSION_SUCCESS,
    recievedAt: Date.now()
  }
}

export function destroySessionFailure(msg) {
  return {
    type: Constants.ACTIONS.DESTROY_SESSION_FAILURE,
    sentAt: Date.now(),
    msg: msg
  }
}

/* Thunks */
const SessionActions = {

  signInUser: function(email, password) {
    return function(dispatch) {
      /* dispatch an action to update the app state to inform that an api call
       * is happening */
      dispatch(requestActions.requestStart("NEW_SESSION"));

      /* make the api request */
      const sessionData = { session: { email: email, password: password } };
      const requestOpts = Utils.makeRequestOptions("POST", sessionData);

      fetch(Constants.ROUTES.SESSION, requestOpts)
      .then((response) => {
        if (response.status == 201)
                    return response.json();
        else if (response.status == 422)
          throw "Invalid credentials";
        else
          throw "";
      })
      .then((json) => {
        localStorage.setItem("phxAuthToken", json.jwt);
        dispatch(newSessionSuccess(json.user));
        dispatch(requestActions.requestEnd());
        dispatch(flashActions.flashSuccess("Successfuly signed in"));
        hashHistory.push(Pages.sites());
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(flashActions.flashSuccess(message));
        dispatch(newSessionFailure(message));
      });
    };
  },

  signOutUser: function() {
    return function(dispatch) {

      const requestOpts = Utils.makeRequestOptions("DELETE");

      fetch(Constants.ROUTES.SESSION, requestOpts)
      .then(function(response) {
        if (response.status == 200) {
          dispatch(destroySessionSuccess());
        } else {
          dispatch(destroySessionFailure("Something went wrong"));
        }
      })
      .catch(function() {
        dispatch(destroySessionFailure("Something went wrong"));
      });

      // remove auth token and redirect regardless
      localStorage.removeItem("phxAuthToken");
      hashHistory.push(Pages.signIn());
    };
  },
};

export default SessionActions;
