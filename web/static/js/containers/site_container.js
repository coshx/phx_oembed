import React          from "react";
import { connect }    from "react-redux";
import SiteView       from "../components/site_view";

const mapStateToProps = (state) => {
  return { sites: state.sites }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class SiteContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {site: this.setSite(props.params.siteId)}
  }

  setSite(siteId) {
    return this.props.sites.siteList.filter(function(site) {
      return parseInt(site.id) == parseInt(siteId)
    })[0];
  }

  render() {
    return(<SiteView site={this.state.site}/>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteContainer)
