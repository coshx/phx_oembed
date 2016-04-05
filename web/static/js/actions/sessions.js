import Constants from "../constants";
import Utils from "../utils";
import { hashHistory } from "react-router";

function newSessionRequest() {
  return {
    type: Constants.ACTIONS.NEW_SESSION_REQUEST,
    sentAt: Date.now()
  }
}

function newSessionSuccess(user) {
  return {
    type: Constants.ACTIONS.NEW_SESSION_SUCCESS,
    recievedAt: Date.now(),
    user: user
  }
}

function newSessionFailure(msg) {
  return {
    type: Constants.ACTIONS.NEW_SESSION_FAILURE,
    sentAt: Date.now(),
    msg: msg
  }
}

function sessionDestroyRequest() {
  return {
    type: Constants.ACTIONS.SESSION_DESTROY_REQUEST,
    sentAt: Date.now()
  }
}

function sessionDestroySuccess() {
  return {
    type: Constants.ACTIONS.SESSION_DESTROY_SUCCESS,
    recievedAt: Date.now()
  }
}

function sessionDestroyFailure(msg) {
  return {
    type: Constants.ACTIONS.SESSION_DESTROY_FAILURE,
    sentAt: Date.now(),
    msg: msg
  }
}

/* Only exporting the thunk actions */
const SessionActions = {

  signInUser: function(email, password) {
    return function(dispatch) {
      /* dispatch an action to update the app state to inform that an api call
       * is happening */
      dispatch(newSessionRequest);

      /* make the api request */
      const sessionData = { session: { email: email, password: password } };

      Utils.makeRequest("POST", Constants.ROUTES.SESSION, sessionData)
      .then(function(xhr) {
        if (xhr.status == 201) {
          const resp = JSON.parse(xhr.responseText);
          localStorage.setItem("phxAuthToken", resp.jwt);
          dispatch(newSessionSuccess(resp.user));
          hashHistory.push(Constants.PAGES.SITES);
        } else if (xhr.status == 422) {
          dispatch(newSessionFailure("Invalid credentials"));
        } else {
          dispatch(newSessionFailure("Something went wrong"));
        }
      })
      .catch(function() {
        dispatch(newSessionFailure("Something went wrong"));
      });
    };
  },

  signOutUser: function() {
    return function(dispatch) {
      dispatch(sessionDestroyRequest);

      Utils.makeRequest("DELETE", Constants.ROUTES.SESSION)
      .then(function(xhr) {
        if (xhr.status == 200) {
          dispatch(sessionDestroySuccess());
        } else {
          dispatch(sessionDestroyFailure("Something went wrong"));
        }
      })
      .catch(function() {
        dispatch(sessionDestroyFailure("Something went wrong"));
      });

      // remove auth token and redirect regardless
      localStorage.removeItem("phxAuthToken");
      hashHistory.push(Constants.PAGES.SIGN_IN);
    };
  }
};

export default SessionActions;
