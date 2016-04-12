import React      from "react";
import { Link }   from "react-router";

export default class Site extends React.Component {
  render() {
    return(
      <div className="site">
        <Link to={"sites/" + this.props.site.id} className="site-link">
          {this.props.site.protocol + "://" + this.props.site.domain}
        </Link>
      </div>
    );
  }
}

Site.propTypes = {
  site: React.PropTypes.object.isRequired
};
