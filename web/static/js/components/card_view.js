import React      from "react";
import InlineEdit from "./inline_edit";

export default class CardView extends React.Component {

  updateValue(fieldName, newValue) {
    this.props.updateCard(fieldName, newValue)
  }

  buildCardTableRows() {
    const rows = [];
    for(let key in this.props.card) {
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
