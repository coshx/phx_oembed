import React      from "react";
import { Link }   from "react-router";

export default class CardListing extends React.Component {
  render() {
    return(
      <div className="card">
        <Link to={""} className="card-link">
          {this.props.card.path}
        </Link>
      </div>
    );
  }
}

CardListing.propTypes = {
  card: React.PropTypes.object.isRequired
};
