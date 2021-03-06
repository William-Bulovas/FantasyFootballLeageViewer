import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchCareerIfNeeded } from "../../reducers/CareerActions";

import MiniCareerTotalsRow from "./MiniCareerTotalsRow";
import MiniCareerTotalsTable from "./MiniCareerTotalsTable";
import CenterLoading from "../CenterLoading";
import RetryButton from "../RetryButton";

class MiniCareerTotals extends Component {
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
    return this.createSortedTeams().map(row => <MiniCareerTotalsRow row={row} />);
  }

  render() {
    const { career } = this.props;
    const { typeOfStats } = this.state;

    if (career == null) {
      return <RetryButton />;
    }

    const rows = this.createSortedRows();

    return (
      <div className="Standing">
        {this.props.isLoading ? (
          <CenterLoading />
        ) : (
          <MiniCareerTotalsTable rows={rows} />
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

export default connect(mapStateToProps)(MiniCareerTotals);
