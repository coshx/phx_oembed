import React      from "react";
import { Link }   from "react-router";
import Constants  from "../constants";

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      userEmail: ""
    }
  }

  navContent() {
    if (this.state.signedIn == true)
      return(<Link to={Constants.PAGES.SIGN_OUT}>Sign Out</Link>);
    else if (this.state.signedIn == true)
      return("");
    else
      return(<Link to={Constants.PAGES.SIGN_IN}>Sign In</Link>);
  }

  render() {
    return(
      <nav>
        {this.navContent()}
      </nav>
    );
  }
}
