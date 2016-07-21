import React      from "react";
import Pages      from "../pages";
import { Link }   from "react-router";

export default class CardListing extends React.Component {
  render() {
    return(
      <tr className="card">
        <td>{this.props.card.path}</td>
        <td>
          <Link
            to={Pages.card(this.props.currentSite.id, this.props.card.id)}
            className="card-link">
            <button>Details</button>
          </Link>
        </td>
        <td>
          <a href="javascript:void(0)" className="delete"
            onClick={this.props.deleteCard}>
            <button>
              Delete
            </button>
          </a>
        </td>
      </tr>
    );
  }
}

CardListing.propTypes = {
  deleteCard: React.PropTypes.func.isRequired,
  card: React.PropTypes.object.isRequired,
  currentSite: React.PropTypes.object.isRequired
};
