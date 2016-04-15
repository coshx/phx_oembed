import React          from "react";
import { connect }    from "react-redux";
import siteActions    from "../actions/sites";
import SiteList       from "../components/site_list";

const mapStateToProps = (state) => {
  return { session: state.session, sites: state.sites }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSites: () => {
      dispatch(siteActions.getSites());
    },
    addNewSite: (domain, protocol) => {
      dispatch(siteActions.addSite(domain, protocol));
    }
  }
}

class SitesContainer extends React.Component {

  componentWillMount() {
    this.props.getSites();
  }

  render() {
    if (this.props.session.signedIn == true)
      return (
        <div className="authenticated-container">
          <SiteList addNewSite={this.props.addNewSite}
                    sites={this.props.sites} />
        </div>
      );
    else
      return (<div>You need to be signed in to view this page</div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesContainer)
