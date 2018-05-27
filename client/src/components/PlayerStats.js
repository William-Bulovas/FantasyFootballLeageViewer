import React, { Component } from "react";
import { fetchStandingsIfNeeded } from "../reducers/StandingsActions";
import { fetchCareerIfNeeded } from "../reducers/CareerActions";
import { connect } from "react-redux";

import { Radar } from "react-chartjs-2";

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

class DropDownMenu extends Component {
  state = { selection: 0 };

  static getDerivedStateFromProps(props, state) {
    if (state.selection == props.currentSelection) {
      return null;
    }

    return { selection: 0 };
  }

  createOptions() {
    let options = [];

    for (let i = 0; i < this.props.list.length; i++) {
      options.push(
        <a
          className="dropdown-item"
          onClick={() => {
            this.setState({ selection: i });
            this.props.onPicked(i);
          }}
        >
          {this.props.getText(i)}
        </a>
      );
    }

    return options;
  }

  render() {
    const pickerOptions = this.createOptions();

    return (
      <div className={"btn-group float-right mb-3" + this.props.classExtension}>
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.props.getText(this.state.selection)}
        </button>
        <div className="dropdown-menu">{pickerOptions}</div>
      </div>
    );
  }
}

class PlayerStats extends Component {
  constructor(props) {
    super(props);

    const selectedCareerData = props.careerTotals[props.teamId];
    const firstResults = selectedCareerData.results[0];
    this.state = {
      radarSeason: firstResults.year,
      compare: 0,
      teamId: props.teamId
    };
  }

  componentDidMount() {
    this.getStandings();
    this.getCareerStats();
  }

  static getDerivedStateFromProps(props, state) {
    if (state.teamId == props.teamId) {
      return null;
    }

    const selectedCareerData = props.careerTotals[props.teamId];
    const firstResults = selectedCareerData.results[0];
    return {
      radarSeason: firstResults.year,
      compare: 0,
      teamId: props.teamId
    };
  }

  getStandings = () => {
    this.props.dispatch(fetchStandingsIfNeeded());
  };

  getCareerStats = () => {
    this.props.dispatch(fetchCareerIfNeeded());
  };

  constructStandingsRows() {
    const standingsRows = [];

    for (const standingIndex in this.props.standings) {
      const standing = this.props.standings[standingIndex];

      for (const teamIndex in standing.standings) {
        let team = standing.standings[teamIndex];
        if (team.managers[0].guid == this.props.teamId) {
          team.season = standing.season;
          standingsRows.push(<StandingTableRow row={team} />);
        }
      }
    }

    return standingsRows;
  }

  constructCareerRows() {
    return <CareerTableRow row={this.props.careerTotals[this.props.teamId]} />;
  }

  getMax(getterFunction, yearIndex) {
    let max = 0;
    const yearStanding = this.getStandingsForYear(yearIndex);

    for (const teamIndex of Object.keys(yearStanding.standings)) {
      const team = yearStanding.standings[teamIndex];
      if (getterFunction(team) > max) {
        max = getterFunction(team);
      }
    }

    return max;
  }

  getMin(getterFunction, yearIndex) {
    // TODO make this more robust and less hacky
    let min = 10000;
    const yearStanding = this.getStandingsForYear(yearIndex);

    for (const teamIndex of Object.keys(yearStanding.standings)) {
      const team = yearStanding.standings[teamIndex];
      if (getterFunction(team) < min) {
        min = getterFunction(team);
      }
    }
    return min;
  }

  getStandingForSelectedUser(yearIndex) {
    return this.getStandingForUser(yearIndex, this.props.teamId);
  }

  getStandingForUser(yearIndex, id) {
    const year = this.getStandingsForYear(yearIndex);

    for (const teamIndex of Object.keys(year.standings)) {
      const team = year.standings[teamIndex];

      if (team.managers[0].guid == id) {
        return team;
      }
    }
  }

  getStandingsForYear(year) {
    for (const yearIndex of Object.keys(this.props.standings)) {
      const standing = this.props.standings[yearIndex];

      if (standing.league_key == year) {
        return standing;
      }
    }
  }

  createComparisonList() {
    let compare = [{ nickname: "Default" }];
    const selectedSeasonData = this.getStandingsForYear(this.state.radarSeason);

    for (const teamIndex of Object.keys(selectedSeasonData.standings)) {
      const team = selectedSeasonData.standings[teamIndex];

      if (team.managers[0].guid != this.props.teamId) {
        compare.push(team.managers[0]);
      }
    }

    return compare;
  }

  getNormalized(inital, getter, year) {
    return (
      (inital - this.getMin(getter, year)) /
      (this.getMax(getter, year) - this.getMin(getter, year)) *
      100
    );
  }

  createRadarDataSet(year, colour, selectedTeamData) {
    let radarData = [];

    radarData.push(
      this.getNormalized(
        parseInt(selectedTeamData.standings.outcome_totals.wins),
        team => {
          return parseInt(team.standings.outcome_totals.wins);
        },
        year
      )
    );
    radarData.push(
      this.getNormalized(
        parseInt(selectedTeamData.standings.outcome_totals.losses),
        team => {
          return parseInt(team.standings.outcome_totals.losses);
        },
        year
      )
    );

    radarData.push(
      this.getNormalized(
        parseInt(selectedTeamData.number_of_moves),
        team => {
          return parseInt(team.number_of_moves);
        },
        year
      )
    );

    radarData.push(
      this.getNormalized(
        parseFloat(selectedTeamData.standings.points_for),
        team => {
          return parseFloat(team.standings.points_for);
        },
        year
      )
    );
    radarData.push(
      this.getNormalized(
        selectedTeamData.standings.points_against,
        team => {
          return team.standings.points_against;
        },
        year
      )
    );

    return {
      label: selectedTeamData.managers[0].nickname,
      backgroundColor: colour,
      data: radarData
    };
  }

  createRadarData() {
    let data = {
      labels: ["Wins", "Losses", "Moves", "Points For", "Points Against"],
      options: {
        tooltip: { enabled: false },
        scale: {
          display: false,
          ticks: {
            min: -10,
            max: 110
          }
        }
      }
    };

    const radarData = this.createRadarDataSet(
      this.state.radarSeason,
      "rgba(200,0,0,0.2)",
      this.getStandingForSelectedUser(this.state.radarSeason)
    );

    data.datasets = [radarData];

    if (this.state.compare > 0) {
      const compareList = this.createComparisonList();

      const comparedDate = compareList[this.state.compare];
      const compareRadarDate = this.createRadarDataSet(
        this.state.radarSeason,
        "rgba(0,0,200,0.2)",
        this.getStandingForUser(this.state.radarSeason, comparedDate.guid)
      );

      data.datasets.push(compareRadarDate);
    }

    return data;
  }

  render() {
    console.log(this.state.radarSeason);

    const standingsRows = this.constructStandingsRows();
    const careerRows = this.constructCareerRows();
    const radarData = this.createRadarData();
    const selectedCareerData = this.props.careerTotals[this.props.teamId];
    console.log(selectedCareerData);
    const compareList = this.createComparisonList();

    return (
      <div>
        <PlayerStatsTable
          standingsRows={standingsRows}
          careerRows={careerRows}
        />

        <DropDownMenu
          onPicked={i =>
            this.setState({ radarSeason: selectedCareerData.results[i].year })}
          length={selectedCareerData.years_played}
          list={selectedCareerData.results}
          getText={i => selectedCareerData.results[i].season}
          currentSelection={this.state.radarSeason}
        />

        <DropDownMenu
          onPicked={i => this.setState({ compare: i })}
          length={compareList.length}
          list={compareList}
          getText={i => compareList[i].nickname}
          classExtension={" mr-2"}
        />

        <Radar data={radarData} />
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
