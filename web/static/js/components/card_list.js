import React              from "react";
import CardListing        from "./card_listing";
import NewCardForm        from "./new_card_form";

export default class CardList extends React.Component {

  buildCardList() {
    const currentSite = this.props.currentSite;
    return(this.props.cards.cardList.map(function(card) {
      return(<CardListing key={card.id}
                          card={card}
                          currentSite={currentSite}/>);
    }));
  }

  render() {
    return(
      <div>
        <NewCardForm onSubmit={this.props.addNewCard}/>
        <div className="card-list">
          {this.buildCardList()}
        </div>
      </div>
    )
  }
}

CardList.propTypes = {
  cards: React.PropTypes.object.isRequired
}
