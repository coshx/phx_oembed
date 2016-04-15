import Constants              from "../constants";
import Utils                  from "../utils";
import * as requestActions    from "./request";
import * as flashActions      from "./flash";

export function getCardsSuccess(cards) {
  return({
    type: Constants.ACTIONS.GET_CARDS_SUCCESS,
    cards: cards,
    sentAt: Date.now()
  });
}

export function getCardsFailure() {
  return({
    type: Constants.ACTIONS.GET_CARDS_FAILURE,
    sentAt: Date.now()
  });
}

/* Thunks */
const cardActions = {

  getCards: function(siteId) {
    return function(dispatch) {
      dispatch(requestActions.requestStart("GET_CARDS"));

      const requestOpts = Utils.makeRequestOptions("GET");
      const url = Constants.ROUTES.SITES + "/" + siteId + "/cards"

      fetch(url, requestOpts)
      .then((response) => {
        if (response.status == 200)
          return response.json()
        else
          throw "";
      })
      .then((json) => {
        dispatch(requestActions.requestEnd());
        dispatch(getCardsSuccess(json));
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(flashActions.flashError("Problem fetching cards: " + message));
        dispatch(getCardsFailure());
      })
    };
  }
}

export default cardActions
