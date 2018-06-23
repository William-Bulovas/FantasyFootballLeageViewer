import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWeekStatsIfNeeded } from "../../reducers/WeekStatsActions";
import ReactLoading from "react-loading";

import RosterRow from "./RosterRow";

class PlayerWeekRoster extends Component {
  componentDidMount() {
    this.getRoster(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getRoster(nextProps);
  }

  getRoster(p) {
    this.props.dispatch(fetchWeekStatsIfNeeded(p.teamId, p.week));
  }

  createRows() {
    return this.props.roster.roster.map(roster => <RosterRow row={roster} />);
  }

  render() {
    const rosterRows = this.createRows();

    return (
      <div>
        {this.props.isLoading ? (
          <div className="w-100 d-flex justify-content-center">
            <ReactLoading type="bars" color="#1919FF" />
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Team</th>
                  <th>Player</th>
                </tr>
              </thead>
              <tbody>{rosterRows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  if (
    state.weekRoster == null ||
    !state.weekRoster.hasOwnProperty(ownProps.teamId)
  ) {
    return {
      isLoading: state.isFetchingWeekStats
    };
  }

  return {
    roster: state.weekRoster[ownProps.teamId][ownProps.week],
    isLoading: state.isFetchingWeekStats
  };
}

export default connect(mapStateToProps)(PlayerWeekRoster);
