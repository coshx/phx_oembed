import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import cardReducer              from "../../../web/static/js/reducers/card_reducer";
import * as cardActions         from "../../../web/static/js/actions/cards";

describe("cardReducer", () => {

  it("should return the default state with no match", () => {
    const returnedState = cardReducer(undefined, {});
    expect(returnedState).toEqual({});
  })

  it("should handle GET_CARDS_SUCCESS", () => {
    const cards = [{path: "example.org", card_type: "twitter"}];
    const returnedState = cardReducer(undefined,
                                      cardActions.getCardsSuccess(cards));
    expect(returnedState).toEqual({
      cardList: cards
    });
  })

  it("should handle GET_CARDS_FAILURE", () => {
    const returnedState = cardReducer({cardList: []},
                                      cardActions.getCardsFailure());
    expect(returnedState).toEqual({cardList: []});
  })

  it("should handle NEW_CARD_FAILURE", () => {
    const existingCard = { path: "/bar", card_type: "twitter" }
    const cardList = [existingCard];
    const returnedState = cardReducer({cardList: cardList},
                                      cardActions.newCardFailure());
    expect(returnedState).toEqual({cardList: cardList})
  })

  it("should handle NEW_CARD_SUCCESS", () => {
    const existingCard = { path: "/bar", card_type: "twitter" }
    const newCard = { path: "/foo", card_type: "twitter" }
    const cardList = [existingCard];
    const newList = [newCard, existingCard]
    const returnedState = cardReducer({cardList: cardList},
                                      cardActions.newCardSuccess(newCard));
    expect(returnedState).toEqual({
      cardList: newList
    })
  })

  it("should handle SET_CURRENT_CARD", () => {
    const card = {id: 4, path: "/foo", card_type: "twitter"};
    const existingCard = {id: 3, path: "/bar", card_type: "facebook"};
    const cardList = [card, existingCard];
    const returnedState = cardReducer({cardList: cardList},
                                      cardActions.setCurrentCard(card.id));
    expect(returnedState).toEqual({
      cardList: cardList,
      currentCard: card
    })
  })

  it("should handle UPDATE_CURRENT_CARD_SUCCESS", () => {
    const newAttributes = {path: "/foo", card_type: "twitter"}
    const existingCard = {id: 3, path: "/bar", card_type: "facebook"};
    const updatedCard = {id:3, path: "/foo", card_type: "twitter"};

    const returnedState = cardReducer(
                            {currentCard: existingCard},
                            cardActions.updateCurrentCardSuccess(newAttributes));

    expect(returnedState).toEqual({
      currentCard: updatedCard
    })
  })

  it("should handle UPDATE_CURRENT_CARD_FAILURE", () => {
    const existingCard = {id: 3, path: "/bar", card_type: "facebook"};

    const returnedState = cardReducer(
                            {currentCard: existingCard},
                            cardActions.updateCurrentCardFailure());

    expect(returnedState).toEqual({
      currentCard: existingCard
    })
  })

  it("should handle DELETE_CARD_SUCCESS", () => {
    const deletedCard = {id: 3, path: "/bar", card_type: "facebook"};
    const card = {id: 4, path: "/foo", card_type: "tiwtter"};
    const cardList = [card, deletedCard];
    const returnedState = cardReducer({currentCard: card, cardList: cardList},
     cardActions.deleteCardSuccess(deletedCard.id));

     expect(returnedState).toEqual({
       currentCard: card,
       cardList: [card]
     })
  })

  it("should handle DELETE_CARD_FAILURE", () => {
    const deletedCard = {id: 3, path: "/bar", card_type: "facebook"};
    const card = {id: 3, path: "/bar", card_type: "facebook"};
    const cardList = [card, deletedCard];
    const returnedState = cardReducer({currentCard: card, cardList: cardList},
     cardActions.deleteCardFailure());

     expect(returnedState).toEqual({
       currentCard: card,
       cardList: cardList
     })
  })

})

