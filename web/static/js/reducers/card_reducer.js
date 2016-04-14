import Constants from "../constants";

function cardReducer(state = {}, action) {
  switch(action.type) {

    case Constants.ACTIONS.GET_CARDS_SUCCESS:
      return Object.assign({}, state, {
        cardList: action.cards
      })

    case Constants.ACTIONS.GET_SITES_FAILURE:
      return state

    default:
      return state
  }
}

export default cardReducer
