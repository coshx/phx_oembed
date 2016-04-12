import React  from "react";

export default class SiteView extends React.Component {
  render() {
    return(
      <div>
        <h2>SiteView</h2>
        {this.props.site.domain}
      </div>
    );
  }
}

SiteView.propTypes = {
  site: React.PropTypes.object.isRequired
};
