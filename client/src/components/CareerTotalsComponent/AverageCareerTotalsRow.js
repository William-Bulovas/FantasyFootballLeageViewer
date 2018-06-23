import React, { Component } from "react";

export default class AverageCareerTotalsRow extends Component {
  calculateResults(place) {
    return this.props.row.results.filter(result => result.result == place)
      .length;
  }

  calculateAverage(field) {
    return (parseInt(field) / parseInt(this.props.row["years_played"])).toFixed(2);
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
        <td>{this.calculateAverage(row["wins"])}</td>
        <td>{this.calculateAverage(row["losses"])}</td>
        <td>{this.calculateAverage(row["pointsFor"])}</td>
        <td>{this.calculateAverage(row["pointsAgainst"])}</td>
        <td>{this.calculateAverage(row["movesMade"])}</td>
        <td>{this.calculateAverage(row["tradesMade"])}</td>
      </tr>
    );
  }
}
