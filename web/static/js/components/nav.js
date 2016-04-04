import React      from "react";
import { Link }   from "react-router";
import Constants  from "../constants";

export default class Nav extends React.Component {

  navContent() {
    const signInPath = Constants.PAGES.SIGN_IN;

    if (this.props.signedIn == true)
      return(<a href="">Sign Out</a>);
    else if (this.context.router.isActive({pathname: signInPath}))
      return("");
    else
      return(<Link to={signInPath}>Sign In</Link>);
  }

  render() {
    return(
      <nav>
        {this.navContent()}
      </nav>
    );
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired
}
