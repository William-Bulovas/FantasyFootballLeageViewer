import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchCurrentStandingsIfNeeded } from "../../reducers/CurrentStandingsActions";

import CurrentStandingsRow from "./CurrentStandingsRow";
import CurrentStandingsTable from "./CurrentStandingsTable";
import RetryButton from "../RetryButton";
import CenterLoading from "../CenterLoading";

class CurrentStandings extends Component {
  componentDidMount() {
    this.getStandings();
  }

  getStandings = () => {
    this.props.dispatch(fetchCurrentStandingsIfNeeded());
  };

  createRows() {
    const rows = [];
    this.props.standings["standings"].forEach(row => {
      rows.push(<CurrentStandingsRow row={row} key={row["team_id"]} />);
    });

    return rows;
  }

  render() {
    if (this.props.standings == null) {
      return <RetryButton retry={this.getStandings} />;
    }

    const rows = this.createRows();

    return (
      <div className="Standing">
        {this.props.isLoading ? (
          <CenterLoading />
        ) : (
          <CurrentStandingsTable rows={rows} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    standings: state.currentStandings,
    isLoading: state.isFetchingCurrent
  };
}

export default connect(mapStateToProps)(CurrentStandings);
