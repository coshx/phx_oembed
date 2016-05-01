import Constants              from "../constants";
import Utils                  from "../utils";
import Routes                 from "../routes";
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

export function newCardFailure() {
  return({
    type: Constants.ACTIONS.NEW_CARD_FAILURE,
    sentAt: Date.now()
  });
}

export function newCardSuccess(newCard) {
  return({
    type: Constants.ACTIONS.NEW_CARD_SUCCESS,
    newCard: newCard,
    sentAt: Date.now(),
  });
}

export function setCurrentCard(cardId) {
  return({
    type: Constants.ACTIONS.SET_CURRENT_CARD,
    cardId: cardId,
    sentAt: Date.now()
  });
}

export function updateCurrentCardSuccess(newAttributes) {
  return({
    type: Constants.ACTIONS.UPDATE_CURRENT_CARD_SUCCESS,
    newAttributes: newAttributes,
    sentAt: Date.now()
  });
}

export function updateCurrentCardFailure() {
  return({
    type: Constants.ACTIONS.UPDATE_CURRENT_CARD_FAILURE,
    sentAt: Date.now()
  });
}

export function deleteCardSuccess(cardId) {
  return({
    type: Constants.ACTIONS.DELETE_CARD_SUCCESS,
    cardId: cardId,
    sentAt: Date.now()
  });
}

export function deleteCardFailure() {
  return({
    type: Constants.ACTIONS.DELETE_CARD_FAILURE,
    sentAt: Date.now()
  });
}



/* Thunks */
const cardActions = {

  getCards: function(siteId) {
    return function(dispatch) {
      dispatch(requestActions.requestStart("GET_CARDS"));

      const requestOpts = Utils.makeRequestOptions("GET");
      const url = Routes.cards(siteId);

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
  },

  addCard: function(siteId, newCard) {
    return function(dispatch) {
      dispatch(requestActions.requestStart("NEW_SITE"));

      const newCardData = {card: newCard};
      const requestOpts = Utils.makeRequestOptions("POST", newCardData);

      const url = Routes.cards(siteId);
      fetch(url, requestOpts)
      .then((response) => {
        if(response.status == 200)
          return response.json();
        else
          throw "Something went wrong";
      })
      .then((json) => {
        dispatch(requestActions.requestEnd());
        dispatch(newCardSuccess(json));
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(flashActions.flashError("Problem adding new card: " + message));
        dispatch(newCardFailure());
      })
    }
  },

  updateCard: function(siteId, cardId, data) {
    return function(dispatch) {
      dispatch(requestActions.requestStart("UPDATE_CARD"));
      const newAttributes = {card: data};
      const requestOpts = Utils.makeRequestOptions("PATCH", newAttributes);
      const url = Routes.card(siteId, cardId)

      fetch(url, requestOpts)
      .then((response) => {
        if(response.status == 200)
          return response.json();
        else
          throw "Problem updating card";
      })
      .then((json) => {
        dispatch(requestActions.requestEnd());
        dispatch(updateCurrentCardSuccess(json));
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(requestActions.updateCurrentCardFailure());
        dispatch(flashActions.flashError("Problem updating card: " + message));
      })
    }
  },

  deleteCard: function(siteId, cardId) {
    return function (dispatch) {
      dispatch(requestActions.requestStart("DELETE_CARD"));
      const requestOpts = Utils.makeRequestOptions("DELETE");
      const url = Routes.card(siteId, cardId);

      fetch(url, requestOpts)
      .then((response) => {
        if(response.status == 200) {
          dispatch(requestActions.requestEnd());
          dispatch(deleteCardSuccess());
        }
        else
          throw "Problem deleting card";
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(deleteCardFailure());
        dispatch(flashActions.flashError("Problem deleting card: " + message));
      })
    }
  }
}

export default cardActions
