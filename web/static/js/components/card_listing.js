import React      from "react";
import Pages      from "../pages";
import { Link }   from "react-router";

export default class CardListing extends React.Component {
  render() {
    return(
      <div className="card">
        <Link
          to={Pages.card(this.props.currentSite.id, this.props.card.id)}
          className="card-link">
          {this.props.card.path}
        </Link>
        <a href="javascript:void(0)" className="delete"
          onClick={this.props.deleteCard} >
          Delete
        </a>
      </div>
    );
  }
}

CardListing.propTypes = {
  deleteCard: React.PropTypes.func.isRequired,
  card: React.PropTypes.object.isRequired,
  currentSite: React.PropTypes.object.isRequired
};
