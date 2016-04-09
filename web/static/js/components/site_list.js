import React        from "react";
import Site         from "./site";

export default class SiteList extends React.Component {

  buildSiteList() {
    return(this.props.sites.map(function(site) {
      return(<Site key={site.id} site={site} />);
    }));
  }

  render() {
    return(
      <div className="site-list">
        <h1>Sites</h1>
        {this.buildSiteList()}
      </div>
    );
  }
}
