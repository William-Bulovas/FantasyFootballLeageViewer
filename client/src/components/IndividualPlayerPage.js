import React, { Component } from "react";

import PlayerRoster from "./RosterComponent/PlayerRoster";
import PlayerStats from "./PlayerStats";
import PlayerMatchups from "./PlayerMatchups";

export default class IndividualPlayerPage extends Component {
  state = { page: "roster" };

  render() {
    const activeRoster = this.state.page == "roster" ? " active" : "";
    const activeStats = this.state.page == "stats" ? " active" : "";
    const activeMatchups = this.state.page == "matchups" ? " active" : "";

    return (
      <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5">
        <div className="row mt-3">
          <h3>{this.props.standings["manager"][0]["nickname"]}</h3>
        </div>

        <div className="nav nav-tabs justify-content-center mb-3">
          <li class="nav-item">
            <a
              class={"nav-link" + activeStats}
              href="#"
              onClick={() => this.setState({ page: "stats" })}
            >
              Stats
            </a>
          </li>
          <li class="nav-item">
            <a
              class={"nav-link" + activeRoster}
              href="#"
              onClick={() => this.setState({ page: "roster" })}
            >
              Roster
            </a>
          </li>
          <li class="nav-item">
            <a
              class={"nav-link" + activeMatchups}
              href="#"
              onClick={() => this.setState({ page: "matchups" })}
            >
              Matchups
            </a>
          </li>
        </div>

        {this.state.page == "roster" ? (
          <PlayerRoster standings={this.props.standings} />
        ) : this.state.page == "stats" ? (
          <PlayerStats teamId={this.props.selectedId} />
        ) : (
          <PlayerMatchups teamId={this.props.selectedId} />
        )}
      </div>
    );
  }
}
