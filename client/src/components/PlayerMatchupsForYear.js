import React, { Component } from "react";
import { fetchMatchupsIfNeeded } from "../reducers/MatchupActions";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import CenterLoading from "./CenterLoading";

class MatchupRow extends Component {
  render() {
    const row = this.props.row;
    const team1 = this.props.row.teams[0];
    const team2 = this.props.row.teams[1];

    return (
      <tr>
          <td>{row.week}</td>
          <td>{team1.name}</td>
          <td>{team1.points.total}</td>
          <td>{team2.points.total}</td>
          <td>{team2.name}</td>
      </tr>
    );
  }
}

class MatchupTable extends Component {
  render() {
    return (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Week</th>
                <th colspan="2">Team A</th>
                <th colspan="2">Team B</th>
              </tr>
            </thead>
            <tbody>{this.props.rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

class PlayerMatchupsForYear extends Component {
  getMatchups = () => {
    this.props.dispatch(fetchMatchupsIfNeeded(this.props.teamYearId));
  };

  createRows() {
    const selectedMatchup = this.props.matchups[this.props.teamYearId];
    const allMatchups = selectedMatchup.matchups;

    return allMatchups.map(matchup => <MatchupRow row={matchup} />);
  }

  render() {
    this.getMatchups();

    if(this.props.isLoading) {
      return <CenterLoading/>
    }

    if (
      this.props.matchups == null ||
      this.props.matchups[this.props.teamYearId] === undefined
    ) {
      return <div />;
    }

    const matchUpRows = this.createRows();

    return <MatchupTable rows={matchUpRows} />;
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isFetchingMatchups,
    matchups: state.matchups
  };
}

export default connect(mapStateToProps)(PlayerMatchupsForYear);
