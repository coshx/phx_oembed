import Constants from "../constants";
import Utils from "../utils";

function newSessionRequest() {
  return {
    type: Constants.ACTIONS.NEW_SESSION_REQUEST,
    sentAt: Date.now()
  }
}

function newSessionSuccess(user, jwt) {
  return {
    type: Constants.ACTIONS.NEW_SESSION_SUCCESS,
    recievedAt: Date.now(),
    user: user,
    jwt: jwt
  }
}

function newSessionFailure(msg) {
  return {
    type: Constants.ACTIONS.NEW_SESSION_FAILURE,
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

      Utils.makeRequest("POST", Constants.ROUTES.NEW_SESSION, sessionData)
      .then(function(xhr) {
        if (xhr.status == 201) {
          const resp = JSON.parse(xhr.responseText);
          dispatch(newSessionSuccess(resp.user, resp.jwt));
        } else if (xhr.status == 422) {
          dispatch(newSessionFailure("Invalid credentials"));
        } else {
          dispatch(newSessionFailure("Something went wrong"));
        }
      })
      .catch(function(xhr) {
        dispatch(newSessionFailure("Something went wrong"));
      });
    };
  }
};

export default SessionActions;
