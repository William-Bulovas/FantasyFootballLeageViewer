import React, { Component } from "react";

import Plot from "react-plotly.js";

import { connect } from "react-redux";

import { fetchCareerIfNeeded } from "../reducers/CareerActions";

import RetryButton from "./RetryButton";

class StandingsPlot extends Component {
  state = { standingsList: [] };

  componentDidMount() {
    this.getStandings();
  }

  getStandings = () => {
    this.props.dispatch(fetchCareerIfNeeded());
  };

  createPlotData() {
    let plotData = [];

    Object.values(this.props.career).forEach(standing => {
      let x = [];
      let y = [];
      standing.results.forEach(result => {
        x.push(result.season);
        y.push(result.result);
      });

      const trace = {
        x: x,
        y: y,
        type: "scatter",
        name: standing.manager[0].nickname
      };

      plotData.push(trace);
    });
    return plotData;
  }

  render() {
    const { career } = this.props;

    if (career == null) {
      return <RetryButton />;
    }

    const plotData = this.createPlotData();

    return (
      <Plot
        data={plotData}
        layout={{
          yaxis: {
            autorange: "reversed",
            dtick: 1
          },
          xaxis: { dtick: 1 }
        }}
        config={{ staticPlot: true }}
        style={{
          width: "auto",
          height: "auto"
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    career: state.career
  };
}

export default connect(mapStateToProps)(StandingsPlot);
