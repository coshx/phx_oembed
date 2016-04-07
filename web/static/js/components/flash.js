import React from "react";

export default class Flash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      flashType: ""
    }
  }

  /* by setting the state strings to "" in the constructor, and using this
   * function, we assure the flash state will be set to not display on page
   * refresh or change */
  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      flashType: nextProps.flashType
    });
  }

  isFlashPresent() {
    return (this.state.message != "")
  }

  closeFlash(e) {
    e.preventDefault();
    this.setState({message: ""});
  }

  render() {
    if(this.isFlashPresent()) {
      return(
        <div id="flash" className={"flash-" + this.state.flashType}>
          <span className="flash-message">{this.state.message}</span>
          <span className="close-button">
            <a onClick={this.closeFlash.bind(this)} href="#">X</a>
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
  message: React.PropTypes.string
};
