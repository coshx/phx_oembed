import React  from "react";

export default class Site extends React.Component {
  render() {
    return(
      <div className="site">
        <a href="" className="site-link">
          {this.props.site.protocol + "://" + this.props.site.domain}
        </a>
      </div>
    );
  }
}
