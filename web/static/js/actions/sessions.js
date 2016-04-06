import Constants        from "../constants";
import Utils            from "../utils";
import { hashHistory }  from "react-router";

export function newSessionRequest() {
  return {
    type: Constants.ACTIONS.NEW_SESSION_REQUEST,
    sentAt: Date.now()
  }
}

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
      dispatch(newSessionRequest);

      /* make the api request */
      const sessionData = { session: { email: email, password: password } };
      const requestOpts = Utils.makeRequestOptions("POST", sessionData);

      fetch(Constants.ROUTES.SESSION, requestOpts)
      .then((response) => {
        if (response.status == 201)
          return response.json()
        else if (response.status == 422)
          throw "Invalid credentials";
        else
          throw "";
      })
      .then((json) => {
        localStorage.setItem("phxAuthToken", json.jwt);
        dispatch(newSessionSuccess(json.user));
        hashHistory.push(Constants.PAGES.SITES);
      })
      .catch((message) => {
        if (message == "Invalid Credentials")
          dispatch(newSessionFailure(message));
        else
          dispatch(newSessionFailure("Something went wrong"));
      })
    };
  },

  signOutUser: function() {
    return function(dispatch) {
      dispatch(sessionDestroyRequest);

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
      hashHistory.push(Constants.PAGES.SIGN_IN);
    };
  }
};

export default SessionActions;
