import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import cardReducer              from "../../../web/static/js/reducers/card_reducer";
import * as cardActions         from "../../../web/static/js/actions/cards";

describe("cardRecuer", () => {

  it("should return the default state with no match", () => {
    const returnedState = cardReducer(undefined, {});
    expect(returnedState).toEqual({});
  })

  it("should handle GET_CARDS_SUCCESS", () => {
    const cards = [{path: "example.org", card_type: "twitter"}];
    const returnedState = cardReducer(undefined, cardActions.getCardsSuccess(cards));
    expect(returnedState).toEqual({
      cardList: cards
    });
  })

  it("should handle GET_CARDS_FAILURE", () => {
    const returnedState = cardReducer({cardList: []}, cardActions.getCardsFailure());
    expect(returnedState).toEqual({cardList: []});
  })
})

