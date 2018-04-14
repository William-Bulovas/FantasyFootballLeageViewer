import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

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
                    <Table striped bordered condensed hover responsive>
                        <thead>
                            <tr>
                                    <th>Team</th>
                                    <th>Wins</th>
                                    <th>Losses</th>
                                    <th>Points For</th>
                                    <th>Points Against</th>
                                </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </div>
			</div>
		);
	}
}
