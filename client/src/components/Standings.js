import React, { Component } from 'react';

class StandingsRow extends Component {
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

export default class CurrentStandings extends Component {    

	render() {    
		const standingsList = this.props.standings;

		const rows = [];
		if (Object.values(standingsList).length) {
			standingsList["standings"].forEach((row) => {
				rows.push(<StandingsRow row={row} key={row["team_id"]}/>);
			});
		}

		return (

			<div className="Standing">
                <div>
					<div className='table-responsive'>
						<table className='table table-bordered table-striped table-hover'>
							<thead>
								<tr>
									<th>Team</th>
									<th>Wins</th>
									<th>Losses</th>
									<th>Points For</th>
									<th>Points Against</th>
									<th>Moves Made</th>
									<th>Trades Made</th>
								</tr>
							</thead>
							<tbody>{rows}</tbody>
						</table>
					</div>
                </div>
			</div>
		);
	}
}
