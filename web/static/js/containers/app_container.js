import React          from "react";
import { connect }    from "react-redux";
import SessionActions from "../actions/sessions"
import Nav            from "../components/nav";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.signedIn,
    currentUserId: state.session.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: (e) => {
      e.preventDefault();
      dispatch(SessionActions.signOutUser())
    }
  }
}

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <Nav signedIn={this.props.signedIn}
             signOutUser={this.props.signOutUser}/>
        <h1>PhxOembed</h1>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
