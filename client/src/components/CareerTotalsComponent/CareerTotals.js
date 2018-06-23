import React, { Component } from "react";

import AggregateCareerTotalsTable from "./AggregateCareerTotalsTable";
import AverageCareerTotalsTable from "./AverageCareerTotalsTable";
import DropDownMenu from "../DropDownMenu";

export default class CareerTotals extends Component {
  state = { typeOfStats: 0 };

  render() {
    return (
      <div className="Standing">
        <DropDownMenu
          onPicked={i => this.setState({ typeOfStats: i })}
          length={2}
          getText={i => (i == 0 ? "Aggregate" : "Average")}
          currentSelection={this.state.typeOfStats}
          list={["Aggregate", "Average"]}
          classExtension=" mr-3"
        />
        {this.state.typeOfStats == 0 ? (
          <AggregateCareerTotalsTable />
        ) : (
          <AverageCareerTotalsTable />
        )}
      </div>
    );
  }
}
