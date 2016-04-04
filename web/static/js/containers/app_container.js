import React          from "react";
import { connect }    from "react-redux";
import Nav            from "../components/nav";

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
        <Nav currentPath={""} />
        <h1>PhxOembed</h1>
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
