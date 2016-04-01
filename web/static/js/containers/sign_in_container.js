import React          from "react";
import { connect }    from "react-redux";
import SessionActions from "../actions/sessions";
import SignInForm     from "../components/sign_in_form";

class SignInContainer extends React.Component {
  render() {
    return <SignInForm onSubmit={this.props.signInUser}/>
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (e) => {
      e.preventDefault();
      dispatch(SessionActions.signInUser(e.target.email.value, e.target.password.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
