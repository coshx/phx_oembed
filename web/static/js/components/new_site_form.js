import React from "react";

export default class NewSiteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  toggleExpander() {
    this.setState({expanded: !this.state.expanded})
  }

  expanderClassName() {
    const base = "expander-trigger new-site-form-expander";
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
          Add Site
        </a>
        <div className="form fieldset new-site-form expander-content">
          <form onSubmit={this.onSubmit.bind(this) }>
            <label htmlFor="domain">Domain</label>
            <input name="domain" id="domain" type="text" />
            <label htmlFor="protocol">Protocol</label>
            <input name="protocol" id="protocol" type="text" />
            <input name="submit" id="submit" type="submit" value="Add" />
          </form>
        </div>
      </div>
    )
  }
}

NewSiteForm.propTypes = {
  expanded: React.PropTypes.bool,
  onSubmit: React.PropTypes.func.isRequired
}