import React              from "react";
import CardListing        from "./card_listing";
import NewCardForm        from "./new_card_form";

export default class CardList extends React.Component {

  buildCardList() {
    const currentSite = this.props.currentSite;
    const siteId = currentSite.id;
    return(this.props.cards.cardList.map((card) => {
      return(<CardListing key={card.id}
                  card={card}
                  currentSite={currentSite}
                  deleteCard={this.props.deleteCard.bind(this, siteId, card.id)} />);
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
  deleteCard: React.PropTypes.func.isRequired,
  cards: React.PropTypes.object.isRequired
}
