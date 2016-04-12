import React from "react";

export default class SignInForm extends React.Component {

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e.target.email.value, e.target.password.value)
  }

  render() {
    return(
      <div className="form fieldset sign-in-form">
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
          <input name="submit" id="submit" type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}
