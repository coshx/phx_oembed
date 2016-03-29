import React          from "react";
import SessionActions from "../actions/sessions"
import SignInForm     from "../components/sign_in_form"

export default class SignInContainer extends React.Component {

  signInUser(e) {
    e.preventDefault();
    SessionActions.signInUser(e.target.email.value, e.target.password.value)
  }

  render() {
    return <SignInForm onSubmit={this.signInUser}/>
  }
}
