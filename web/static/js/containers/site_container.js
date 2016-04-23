import React              from "react";
import { connect }        from "react-redux";
import SiteView           from "../components/site_view";
import CardList           from "../components/card_list";
import * as siteActions   from "../actions/sites";
import cardActions        from "../actions/cards";

const mapStateToProps = (state) => {
  return {
    currentSite: state.sites.currentSite,
    cards: state.cards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCards: (siteId) => {
      dispatch(cardActions.getCards(siteId));
    },
    setCurrentSite: (siteId) => {
      dispatch(siteActions.setCurrentSite(siteId));
    },
    addNewCard: (siteId, newCard) => {
      dispatch(cardActions.addCard(siteId, newCard));
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
    return(
      <div>
        <SiteView site={this.props.currentSite} />
        <CardList addNewCard={this.props.addNewCard.bind(this, this.props.currentSite.id)}
                  currentSite={this.props.currentSite}
                  cards={this.props.cards} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteContainer)
