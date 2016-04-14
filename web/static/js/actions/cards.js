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
