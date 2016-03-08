import React from "react";

export default class AppContainer extends React.Component {

  render() {
    return (
      <div>
        <h1>PhxOembed</h1>
        {this.props.children}
      </div>
    )
  }
}
