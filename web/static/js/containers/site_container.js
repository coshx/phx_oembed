import React              from "react";
import { connect }        from "react-redux";
import SiteView           from "../components/site_view";
import * as siteActions   from "../actions/sites";
import cardActions        from "../actions/cards";

const mapStateToProps = (state) => {
  return {
    currentSite: state.sites.currentSite,
    cardList: state.cards.cardList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (siteId) => {
      dispatch(cardActions.getCards(siteId));
    },
    setCurrentSite: (siteId) => {
      dispatch(siteActions.setCurrentSite(siteId));
    }
  }
}

class SiteContainer extends React.Component {
  componentWillMount() {
    const siteId = this.props.params.siteId;
    this.props.getCards(siteId);
    this.props.setCurrentSite(siteId);
  }

  render() {
    return(<SiteView site={this.props.currentSite} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteContainer)
