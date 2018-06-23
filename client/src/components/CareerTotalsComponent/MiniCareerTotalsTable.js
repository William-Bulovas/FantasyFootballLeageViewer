import React, { Component } from "react";

export default class MiniCareerTotalsTable extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Team</th>
              <th>First</th>
              <th>Secound</th>
              <th>Third</th>
              <th>Years Played</th>
            </tr>
          </thead>
          <tbody>{this.props.rows}</tbody>
        </table>
      </div>
    );
  }
}
