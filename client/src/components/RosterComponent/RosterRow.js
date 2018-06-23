import React, { Component } from "react";

export default class RosterRow extends Component {
    render() {
      const row = this.props.row;
      return (
        <tr>
          <td>{row["display_position"]}</td>
          <td>{row["editorial_team_abbr"]}</td>
          <td>{row["name"]["full"]}</td>
        </tr>
      );
    }
  }
  