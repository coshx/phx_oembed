import React from "react";

export default class CardView extends React.Component {

  buildCardTableRows() {
    const rows = [];
    for(let key in this.props.card) {
      rows.push(
        <tr key={key}>
          <td>{key}</td><td>{this.props.card[key]}</td>
        </tr>
      );
    }

    return(rows);
  }

  render() {
    return(
      <div>
        <h1>Card View</h1>
        <table className="card-view">
          <tbody>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
            {this.buildCardTableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

CardView.propTypes = {
  card: React.PropTypes.object.isRequired
}
