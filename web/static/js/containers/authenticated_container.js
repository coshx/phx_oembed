import React          from "react";
import { connect }    from "react-redux";
import SessionActions from "../actions/sessions";

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class AuthenticatedContainer extends React.Component {

  render() {
    return (<div>AuthenticatedContainer</div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer)
