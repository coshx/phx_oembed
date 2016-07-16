import React      from "react";
import Pages      from "../pages";
import { Link }   from "react-router";

export default class SiteList extends React.Component {
  render() {
    return(
      <tr className="site">
        <td>{this.props.site.domain}</td>
        <td>{this.props.site.protocol}</td>
        <td>
          <Link to={Pages.site(this.props.site.id)} className="site-link" >
            <button>Details</button>
          </Link>
        </td>
      </tr>
    );
  }
}

SiteList.propTypes = {
  site: React.PropTypes.object.isRequired
};
