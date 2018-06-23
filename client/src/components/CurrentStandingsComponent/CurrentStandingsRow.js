import React, { Component } from "react";

export default class CurrentStandingsRow extends Component {
  render() {
    const row = this.props.row;
    return (
      <tr>
        <td scope="row">{row["name"]}</td>
        <td scope="row">{row["standings"]["outcome_totals"]["wins"]}</td>
        <td scope="row">{row["standings"]["outcome_totals"]["losses"]}</td>
      </tr>
    );
  }
}
