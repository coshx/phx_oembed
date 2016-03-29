import Constants from "../constants";
import Utils from "../utils";

const SessionActions = {

  signInUser: function(email, password) {
    console.log("SessionActions.signIn()");

    //Attempt to sign in. If successful, return an action to
    //indicate success and set the current user. If not successful, return an
    //action to indicate failure

    const sessionData = { session: { email: email, password: password } }

    Utils.makeRequest("POST", Constants.ROUTES.NEW_SESSION, sessionData)
    .then(function(xhr) {
      console.log("request responded: ", xhr);
      //return the success action
    })
    .catch(function(xhr) {
      console.log("request error: ", xhr);
      //return the error action
    });
  }


};

export default SessionActions;
