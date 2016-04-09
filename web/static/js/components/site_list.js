import React              from "react";
import Site               from "./site";
import NewSiteForm        from "./new_site_form";

export default class SiteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {displayNewSiteForm: false};
  }

  buildSiteList() {
    return(this.props.sites.map(function(site) {
      return(<Site key={site.id} site={site} />);
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
  sites: React.PropTypes.array.isRequired
};
