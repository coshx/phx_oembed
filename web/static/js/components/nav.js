import React from "react";

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userEmail: ""
    }
  }

  userMenu() {
    if (this.props.loggedIn == true)
      return(<div>Log out</div>);
    else
      return(<div>Log In</div>);
  }

  render() {
    return(
      <nav>{this.userMenu()}</nav>
    );
  }
}
