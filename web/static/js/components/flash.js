import React from "react";

export default class Flash extends React.Component {

  isFlashPresent() {
    return !(this.props.message == "" || this.props.message == undefined || this.props.message == null)
  }

  render() {
    if(this.isFlashPresent())
      return(
        <div id="flash" className={"flash-" + this.props.flashType}>
          <span className="flash-message">{this.props.message}</span>
        </div>
      );
    else
      return(null);
  }
};

Flash.propTypes = {
  flashType: React.PropTypes.string,
  message: React.PropTypes.string
};
