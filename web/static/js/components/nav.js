import React      from "react";
import { Link }   from "react-router";
import Constants  from "../constants";
import Pages      from "../pages";

export default class Nav extends React.Component {

  userMenu() {
    const signInPath = Pages.signIn();

    if (this.props.signedIn == true)
      return(<a href="#" onClick={this.props.signOutUser}>Sign Out</a>);
    else if (this.context.router.isActive({pathname: signInPath}))
      return("");
    else
      return(<Link to={signInPath}>Sign In</Link>);
  }

  render() {
    return(
      <nav>
        <div className="app-logo">PhxOembed</div>
        <div className="user-menu">{this.userMenu()}</div>
      </nav>
    );
  }
};

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired
};

Nav.propTypes = {
  signedIn: React.PropTypes.bool.isRequired,
  signOutUser: React.PropTypes.func.isRequired
};
