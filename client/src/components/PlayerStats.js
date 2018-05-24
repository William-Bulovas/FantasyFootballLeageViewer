import React, { Component } from "react";
import { fetchStandingsIfNeeded } from "../reducers/StandingsActions";
import { fetchCareerIfNeeded } from "../reducers/CareerActions";
import { connect } from 'react-redux';

class StandingTableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.row["season"]}</td>
        <td>{this.props.row["standings"]["outcome_totals"]["wins"]}</td>
        <td>{this.props.row["standings"]["outcome_totals"]["losses"]}</td>
        <td>{this.props.row["standings"]["points_for"]}</td>
        <td>{this.props.row["standings"]["points_against"]}</td>
        <td>{this.props.row["number_of_moves"]}</td>
        <td>{this.props.row["number_of_trades"]}</td>
      </tr>
    );
  }
}

class CareerTableRow extends Component {
  render() {
    return (
      <tr>
        <td>Career</td>
        <td>{this.props.row["wins"]}</td>
        <td>{this.props.row["losses"]}</td>
        <td>{this.props.row["pointsFor"]}</td>
        <td>{this.props.row["pointsAgainst"]}</td>
        <td>{this.props.row["movesMade"]}</td>
        <td>{this.props.row["tradesMade"]}</td>
      </tr>
    );
  }
}

class PlayerStatsTable extends Component {
  render() {
    const rows = this.props.standingsRows;
    rows.push(this.props.careerRows);

    return (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Season</th>
                <th scope="col">Wins</th>
                <th scope="col">Losses</th>
                <th scope="col">Points For</th>
                <th scope="col">Points Against</th>
                <th scope="col">Moves Made</th>
                <th scope="col">Trades Made</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

class PlayerStats extends Component {
  componentDidMount() {
    this.getStandings();
    this.getCareerStats();
  }

  getStandings = () => {
    this.props.dispatch(fetchStandingsIfNeeded());
  };

  getCareerStats = () => {
    this.props.dispatch(fetchCareerIfNeeded());
  };

  constructStandingsRows() {
    const standingsRows = [];
    
    for (const standingIndex in  this.props.standings) {
      const standing = this.props.standings[standingIndex];

      for (const teamIndex in standing.standings) {
        let team = standing.standings[teamIndex];
        if (team.managers[0].guid == this.props.teamId) {
          team.season = standing.season;
          standingsRows.push(<StandingTableRow row={team}/>);
        }
      }
    }

    return standingsRows;
  }

  constructCareerRows() {
    return <CareerTableRow row={this.props.careerTotals[this.props.teamId]}/>;
  }

  render() {
    const standingsRows = this.constructStandingsRows();
    const careerRows = this.constructCareerRows();

    return (
      <div>
        <PlayerStatsTable
          standingsRows={standingsRows}
          careerRows={careerRows}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    standings: state.standings,
    careerTotals: state.career,
    isLoading: state.isFetchingStandings
  };
}

export default connect(mapStateToProps)(PlayerStats);
