import React from "react";
import { connect }    from "react-redux";

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>PhxOembed</h1>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
