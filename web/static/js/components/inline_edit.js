import React from "react";

export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      inputActive: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value != this.props.value) {
      this.setState({value: nextProps.value});
    }
  }

  toggleField() {
    this.setState({inputActive: !this.state.inputActive});
  }

  updateCard() {
    this.props.updateValue(this.state.value);
    this.toggleField();
  }

  trackValueChange(e) {
    this.setState({value: e.target.value});
  }

  renderField() {
    if(this.state.inputActive) {
      return(
        <input onChange={this.trackValueChange.bind(this)}
               onBlur={this.updateCard.bind(this)}
               value={this.state.value} />
      );

    } else {
      return(
        <span onClick={this.toggleField.bind(this)}
              className="inline-edit"
              style={{display: "inline-block", width: "100%", height: "1.5em"}} >
          {this.state.value || ""}
        </span>
      );
    }
  }

  render() {
    return(this.renderField());
  }
}

InlineEdit.propTypes = {
  updateValue: React.PropTypes.func.isRequired,
  value: React.PropTypes.oneOfType(
    [React.PropTypes.string,React.PropTypes.number,]
  )
}
