import React              from "react";
import SiteListing        from "./site_listing";
import NewSiteForm        from "./new_site_form";

export default class SiteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {displayNewSiteForm: false};
  }

  buildSiteList() {
    return(this.props.sites.siteList.map(function(site) {
      return(<SiteListing key={site.id} site={site} />);
    }));
  }

  render() {
    return(
      <div>
        <NewSiteForm onSubmit={this.props.addNewSite} />
        <table className="site-list table-minimal">
          <tr>
            <th>Site</th>
            <th>Protocol</th>
            <th></th>
          </tr>
          <tbody>
            {this.buildSiteList()}
          </tbody>
        </table>
      </div>
    );
  }
}

SiteList.propTypes ={
  sites: React.PropTypes.object.isRequired
};
