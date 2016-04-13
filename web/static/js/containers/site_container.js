import React              from "react";
import { connect }        from "react-redux";
import SiteView           from "../components/site_view";
import * as siteActions   from "../actions/sites";

const mapStateToProps = (state) => {
  return { currentSite: state.sites.currentSite }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSite: (siteId) => {
      dispatch(siteActions.setCurrentSite(siteId));
    }
  }
}

class SiteContainer extends React.Component {

  componentWillMount() {
    this.props.setCurrentSite(this.props.params.siteId);
  }

  render() {
    return(<SiteView site={this.props.currentSite} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteContainer)
