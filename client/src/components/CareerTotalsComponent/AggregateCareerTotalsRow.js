import React, { Component } from "react";

export default class AggregateCareerTotalsRow extends Component {
  calculateResults(place) {
    return this.props.row.results.filter(result => result.result == place)
      .length;
  }

  render() {
    const row = this.props.row;
    return (
      <tr>
        <td>{row["manager"][0]["nickname"]}</td>
        <td>{this.calculateResults(1)}</td>
        <td>{this.calculateResults(2)}</td>
        <td>{this.calculateResults(3)}</td>
        <td>{row["years_played"]}</td>
        <td>{row["wins"]}</td>
        <td>{row["losses"]}</td>
        <td>{row["pointsFor"]}</td>
        <td>{row["pointsAgainst"]}</td>
        <td>{row["movesMade"]}</td>
        <td>{row["tradesMade"]}</td>
      </tr>
    );
  }
}
