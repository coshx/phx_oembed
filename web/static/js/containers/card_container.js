import React            from "react";
import { connect }      from "react-redux";
import cardThunks       from "../actions/cards";
import * as cardActions from "../actions/cards";
import CardView         from "../components/card_view";
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return({
    currentCard: state.cards.currentCard,
    currentSite: state.sites.currentSite
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return({
    setCurrentCard: (cardId) => {
      dispatch(cardActions.setCurrentCard(cardId));
    },
    updateCard: (newAttributes) => {
      const siteId = ownProps.params.siteId;
      const cardId = ownProps.params.cardId;
      dispatch(cardThunks.updateCard(siteId, cardId, newAttributes));
    }
  });
};

class CardContainer extends React.Component {
  componentWillMount() {
    const cardId = this.props.params.cardId;
    this.props.setCurrentCard(cardId);
  }

  render() {
    return(
      <div>
        <CardView card={this.props.currentCard}
                  updateCard={this.props.updateCard} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
