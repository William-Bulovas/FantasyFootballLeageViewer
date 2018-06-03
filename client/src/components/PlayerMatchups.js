import React, { Component } from "react";
import { fetchCareerIfNeeded } from "../reducers/CareerActions";
import PlayerMatchupsForYear from "./PlayerMatchupsForYear";
import { connect } from "react-redux";
import DropDownMenu from "./DropDownMenu";

class PlayerMatchups extends Component {
  state = { yearIndex: 0, teamId: "" };

  componentDidMount() {
    this.getCareerStats();
  }

  getCareerStats = () => {
    this.props.dispatch(fetchCareerIfNeeded());
  };

  static getDerivedStateFromProps(props, state) {
    if (state.teamId == props.teamId) {
      return null;
    }

    return {
      yearIndex: 0,
      teamId: props.teamId
    };
  }

  render() {
    const selectedCareerData = this.props.career[this.props.teamId];
    const result = selectedCareerData.results[this.state.yearIndex];

    return (
      <div>
        <DropDownMenu
          onPicked={i => this.setState({ yearIndex: i })}
          length={selectedCareerData.years_played}
          list={selectedCareerData.results}
          getText={i => selectedCareerData.results[i].season}
          currentSelection={this.state.yearIndex}
          classExtension={" mb-2"}
        />

        <PlayerMatchupsForYear teamYearId={result.team_key} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isFetchingCareer,
    career: state.career
  };
}

export default connect(mapStateToProps)(PlayerMatchups);
