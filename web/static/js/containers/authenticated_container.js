import React          from "react";
import { connect }    from "react-redux";
import SessionActions from "../actions/sessions";
import Flash          from "../components/flash";

const mapStateToProps = (state) => {
  return { session: state.session }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class AuthenticatedContainer extends React.Component {

  render() {
    if (this.props.session.signedIn == true)
      return (
        <div className="authenticated-container">
          <Flash flashType={""} message={""}/>
          <h2>Authenticated Container</h2>
        </div>
      );
    else
      return (<div>You need to be signed in to view this page</div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer)
