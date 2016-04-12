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
        <div className="site-list">
          {this.buildSiteList()}
        </div>
      </div>
    );
  }
}

SiteList.propTypes ={
  sites: React.PropTypes.object.isRequired
};
