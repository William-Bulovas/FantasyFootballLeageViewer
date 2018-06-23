import React, { Component } from "react";

export default class CurrentStandingsTable extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Team</th>
              <th scope="col">Wins</th>
              <th scope="col">Losses</th>
            </tr>
          </thead>
          <tbody>{this.props.rows}</tbody>
        </table>
      </div>
    );
  }
}
