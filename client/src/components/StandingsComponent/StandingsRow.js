import React, { Component } from 'react';

export default class StandingsRow extends Component {
	render() {
		const row = this.props.row;
		return (
			<tr>
				<td>{row["name"]}</td>
				<td>{row["standings"]["outcome_totals"]["wins"]}</td>
				<td>{row["standings"]["outcome_totals"]["losses"]}</td>
				<td>{row["standings"]["points_for"]}</td>
				<td>{row["standings"]["points_against"]}</td>
				<td>{row["number_of_moves"]}</td>
				<td>{row["number_of_trades"]}</td>
			</tr>
		);
	}
}
