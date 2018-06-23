import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchCareerIfNeeded } from "../../reducers/CareerActions";

import AggregateCareerTotalsRow from "./AggregateCareerTotalsRow";
import CenterLoading from "../CenterLoading";
import RetryButton from "../RetryButton";

class AggregateCareerTotalsTotal extends Component {
  state = { typeOfStats: 0 };

  componentDidMount() {
    this.getStandings();
  }

  getStandings = () => {
    this.props.dispatch(fetchCareerIfNeeded());
  };

  createSortedTeams() {
    return Object.values(this.props.career)
      .sort(function(a, b) {
        if (a["wins"] == b["wins"]) {
          return a["pointsFor"] - b["pointsFor"];
        }
        return a["wins"] - b["wins"];
      })
      .reverse();
  }

  createSortedRows() {
    return this.createSortedTeams().map(row => <AggregateCareerTotalsRow row={row} />);
  }

  render() {
    const { career } = this.props;
    const { typeOfStats } = this.state;
    const { mini } = this.props;

    if (career == null) {
      return <RetryButton retry={this.getStandings()} />;
    }

    const rows = this.createSortedRows();

    return (
      <div className="Standing">
        {this.props.isLoading ? (
          <CenterLoading />
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>First</th>
                  <th>Secound</th>
                  <th>Third</th>
                  <th>Years Played</th>
                  <th>{"Total Wins"}</th>
                  <th>{"Total Loses"}</th>
                  <th>{"Total Points For"}</th>
                  <th>{"Total Points Against"}</th>
                  <th>{"Total Moves"}</th>
                  <th>{"Total Trades"}</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    career: state.career,
    isLoading: state.isFetchingCareer
  };
}

export default connect(mapStateToProps)(AggregateCareerTotalsTotal);
