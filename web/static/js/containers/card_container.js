import React            from "react";
import { connect }      from "react-redux";
import cardThunks       from "../actions/cards";
import * as cardActions from "../actions/cards";
import CardView         from "../components/card_view";

const mapStateToProps = (state) => {
  return({
    currentCard: state.cards.currentCard,
    currentSite: state.sites.currentSite
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    setCurrentCard: (cardId) => {
      dispatch(cardActions.setCurrentCard(cardId));
    },
    updateCard: (newAttributes) => {
      dispatch(cardThunks.updateCard(newAttributes));
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
                  updateCard={this.props.updateCard.bind(this, this.props.currentSite.id, this.props.currentCard.id)} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
