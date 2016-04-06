import React from "react";

export default class Flash extends React.Component {

  isFlashPresent() {
    !(this.props.message == "" || this.props.message == undefined || this.props.message == null)
  }

  render() {
    if(this.isFlashPresent())
      return(undefined);
    else
      return(
        <div className="flash" className={this.props.flashType}>
          <span clasName="flash-message">{this.props.message}</span>
        </div>
      );
  }
};

Flash.propTypes = {
  flashType: React.PropTypes.string.isOptional,
  message: React.PropTypes.string.isOptional
};
