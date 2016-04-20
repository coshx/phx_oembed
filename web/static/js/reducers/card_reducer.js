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

    default:
      return state
  }
}

export default cardReducer
