import Constants from "../constants";
import Utils from "../utils";

const SessionActions = {

  signInUser: function(email, password) {
    console.log("SessionActions.signIn()");

    //Attempt to sign in. If successful, return an action to
    //indicate success and set the current user. If not successful, return an
    //action to indicate failure

    const sessionData = { session: { email: email, password: password } };
    let signInAction = { type: Constants.SIGN_IN_USER, status: "", msg: "" };

    Utils.makeRequest("POST", Constants.ROUTES.NEW_SESSION, sessionData)
    .then(function(xhr) {
      console.log("request responded: ", xhr);
      if (xhr.status == 201) {
        signInAction.status = "success";
        signInAction.msg = "Signed in";
        return signInAction;
      } else if (xhr.status == 422) {
        signInAction.status = "failure";
        signInAction.msg = "Invalid credentials";
        return signInAction;
      } else {
        signInAction.status = "error";
        signInAction.msg = "Something went wrong";
        return signInAction;
      }
    })
    .catch(function(xhr) {
      console.log("request error: ", xhr);
      signInAction.status = "error";
      signInAction.msg = "Something went wrong";
      return signInAction;
    });
  }
};

export default SessionActions;
