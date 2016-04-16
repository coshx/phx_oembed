import React from "react";

export default class NewCardForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  toggleExpander() {
    this.setState({expanded: !this.state.expanded})
  }

  expanderClassName() {
    const base = "expander-trigger new-card-form-expander";
    if (this.state.expanded == true)
      return(base);
    else
      return(base + " expander-hidden");
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
    this.setState({expanded: false})
  }

  render() {
    return(
      <div className="expander">
        <a href="javascript:void(0)"
          onClick={this.toggleExpander.bind(this)}
          className={this.expanderClassName()}>
          Add Card
        </a>
        <div className="form fieldset new-card-form expander-content">
          <form onSubmit={this.onSubmit.bind(this) }>
            <input name="submit" id="submit" type="submit" value="Add" />
          </form>
        </div>
      </div>
    );
  }
}

NewCardForm.propTypes = {
  expanded: React.PropTypes.bool,
  onSubmit: React.PropTypes.func.isRequired
}
