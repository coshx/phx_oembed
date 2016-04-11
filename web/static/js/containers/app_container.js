import React              from "react";
import { connect }        from "react-redux";
import sessionActions     from "../actions/sessions";
import * as flashActions  from "../actions/flash";
import Nav                from "../components/nav";
import Flash              from "../components/flash";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.signedIn,
    currentUserId: state.session.user.id,
    flashType: state.flash.flashType,
    flashMsg: state.flash.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: (e) => {
      e.preventDefault();
      dispatch(sessionActions.signOutUser());
    },
    closeFlash: (e) => {
      e.preventDefault();
      dispatch(flashActions.flashClear());
    }
  }
}

class AppContainer extends React.Component {

  render() {
    return (
      <div id="app">
        <Nav signedIn={this.props.signedIn}
             signOutUser={this.props.signOutUser}/>

        <div id="app-main">
          <Flash flashType={this.props.flashType}
                 message={this.props.flashMsg}
                 closeFlash={this.props.closeFlash}/>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
