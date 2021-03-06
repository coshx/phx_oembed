import Constants from "../constants";

function cardReducer(state = {}, action) {
  switch(action.type) {

    case Constants.ACTIONS.GET_CARDS_SUCCESS:
      return Object.assign({}, state, {
        cardList: action.cards
      })

    case Constants.ACTIONS.GET_CARDS_FAILURE:
      return state

    case Constants.ACTIONS.NEW_CARD_FAILURE:
      return state

    case Constants.ACTIONS.NEW_CARD_SUCCESS:
      const updatedCardList = state.cardList;
      updatedCardList.unshift(action.newCard);
      return Object.assign({}, state, {
        cardList: updatedCardList
      })

    case Constants.ACTIONS.SET_CURRENT_CARD:
      const currentCard = state.cardList.filter(function(card) {
        return parseInt(card.id) == parseInt(action.cardId)
      })[0];

      return Object.assign({}, state, {
        currentCard: currentCard
      })

    case Constants.ACTIONS.UPDATE_CURRENT_CARD_SUCCESS:
      const updatedCard = state.currentCard;

      for(let fieldName in action.newAttributes) {
        updatedCard[fieldName] = action.newAttributes[fieldName]
      }

      return Object.assign({}, state, {
        currentCard: updatedCard
      })

    case Constants.ACTIONS.UPDATE_CURRENT_CARD_FAILURE:
      return state

    case Constants.ACTIONS.DELETE_CARD_SUCCESS:
      const updatedList = state.cardList.filter(function(card) {
        return parseInt(card.id) != parseInt(action.cardId);
      })

      return Object.assign({}, state, {
        cardList: updatedList
      })

    case Constants.ACTIONS.DELETE_CARD_FAILURE:
      return state

    default:
      return state
  }
}

export default cardReducer
