import React  from "react";

export default class SiteView extends React.Component {
  render() {
    return(
      <div>
        <h2>{this.props.site.protocol + "://" + this.props.site.domain}</h2>
      </div>
    );
  }
}

SiteView.propTypes = {
  site: React.PropTypes.object.isRequired
};
