import React      from "react";

export default class CardListing extends React.Component {
  render() {
    return(
      <div className="card">{this.props.card.url}</div>
    );
  }
}

CardListing.propTypes = {
  card: React.PropTypes.object.isRequired
};
