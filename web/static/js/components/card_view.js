import React      from "react";
import InlineEdit from "./inline_edit";

export default class CardView extends React.Component {

  updateValue(fieldName, newValue) {
    const newAttributes = {};
    newAttributes[fieldName] = newValue;
    this.props.updateCard(newAttributes);
  }

  buildCardTableRows() {
    const rows = [];
    let card = this.props.card;
    console.log("card is ", card)
    delete(card.id);

    for(let key in card) {
      rows.push(
        <tr key={key}>
          <td>{key}</td>
          <td>
            <InlineEdit
              value={this.props.card[key]}
              updateValue={this.updateValue.bind(this, key)} />
          </td>
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
            <tr><th>Field</th><th>Value</th></tr>
            {this.buildCardTableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

CardView.propTypes = {
  card: React.PropTypes.object.isRequired,
  updateCard: React.PropTypes.func.isRequired
}
