import React from "react";

export default class Flash extends React.Component {

  isFlashPresent() {
    return (this.props.message != "")
  }

  render() {
    if(this.isFlashPresent()) {
      return(
        <div id="flash" className={"flash-" + this.props.flashType}>
          <span className="flash-message">{this.props.message}</span>
          <span className="close-button">
            <a onClick={this.props.closeFlash} href="#">X</a>
          </span>
        </div>
      );
    }
    else {
      return(null);
    }
  }
};

Flash.propTypes = {
  flashType: React.PropTypes.string,
  message: React.PropTypes.string,
  closeFlash: React.PropTypes.func.isRequired
};
