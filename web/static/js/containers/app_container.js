import React          from "react";
import { connect }    from "react-redux";
import Nav            from "../components/nav";

const mapStateToProps = (state) => {
  return { signedIn: state.session.signedIn }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class AppContainer extends React.Component {

  render() {
    return (
      <div>
        <Nav signedIn={this.props.signedIn}/>
        <h1>PhxOembed</h1>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
