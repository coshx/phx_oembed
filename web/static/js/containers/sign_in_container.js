import React          from "react";
import { connect }    from "react-redux";
import SessionActions from "../actions/sessions";
import SignInForm     from "../components/sign_in_form";

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (email, password) => {
      dispatch(SessionActions.signInUser(email, password))
    }
  }
}

class SignInContainer extends React.Component {
  render() {
    return <SignInForm onSubmit={this.props.signInUser}/>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
