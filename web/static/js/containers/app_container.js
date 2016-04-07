import React            from "react";
import { connect }      from "react-redux";
import sessionActions   from "../actions/sessions";
import rehydrateActions from "../actions/rehydrate";
import Nav              from "../components/nav";
import Flash            from "../components/flash";

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
    rehydrateStore: () => {
      dispatch(rehydrateActions.rehydrateStore());
    }
  }
}

class AppContainer extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem("phxAuthToken");
    if (token && this.props.signedIn == false) {
      this.props.rehydrateStore();
    }
  }

  render() {
    return (
      <div id="app">
        <Nav signedIn={this.props.signedIn}
             signOutUser={this.props.signOutUser}/>

        <div id="app-main">
          <Flash flashType={this.props.flashType}
                 message={this.props.flashMsg}/>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
