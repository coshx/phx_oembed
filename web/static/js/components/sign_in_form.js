import React from "react";

export default class SignInForm extends React.Component {

  render() {
    return(
      <div className="form fieldset">
        <form onSubmit={this.props.onSubmit}>
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
