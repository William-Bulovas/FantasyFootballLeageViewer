import React, { Component } from "react";
import StandingsRow from "./StandingsRow";

export default class StandingTable extends Component {
  createRows() {
    const standingsList = this.props.standings;
    
    let rows = [];
    if (Object.values(standingsList).length) {
      standingsList["standings"].forEach(row => {
        rows.push(<StandingsRow row={row} key={row["team_id"]} />);
      });
    }
    return rows;
  }

  render() {
    const rows = this.createRows();

    return (
      <div className="Standing">
        <div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Points For</th>
                  <th>Points Against</th>
                  <th>Moves Made</th>
                  <th>Trades Made</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
