import React            from "react";
import { connect }      from "react-redux";
import * as cardActions from "../actions/cards";
import CardView         from "../components/card_view";

const mapStateToProps = (state) => {
  return({
    currentCard: state.cards.currentCard
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    setCurrentCard: (cardId) => {
      dispatch(cardActions.setCurrentCard(cardId))
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
      <div><CardView card={this.props.currentCard}/></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
