import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentStandingsIfNeeded } from '../reducers/CurrentStandingsActions';

class StandingsRow extends Component {
	render() {
		const row = this.props.row;
		return (
			<tr>
				<td scope="row">{row["name"]}</td>
				<td scope="row">{row["standings"]["outcome_totals"]["wins"]}</td>
				<td scope="row">{row["standings"]["outcome_totals"]["losses"]}</td>
			</tr>
		);
	}
}

class CurrentStandings extends Component {

	componentDidMount() {
		this.getStandings();
	}

	getStandings = () => {
		this.props.dispatch(fetchCurrentStandingsIfNeeded());
	}

	render() {    
		const { standings } = this.props;

		if (standings == null) {
			return 	(				
				<div>
					<h6>No standings :(</h6>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>);

		}

		const rows = [];
		if (Object.values(standings).length) {
			standings["standings"].forEach((row) => {
				rows.push(<StandingsRow row={row} key={row["team_id"]}/>);
			});
		}

		return (

			<div className="Standing">
				{rows.length ? (
					<div>
						<table className='table table-bordered table-striped table-hover'>
							<thead>
								<tr>
									<th scope="col">Team</th>
									<th scope="col">Wins</th>
									<th scope="col">Losses</th>
								</tr>
							</thead>
							<tbody>{rows}</tbody>
						</table>
					</div>
				) : (
					// If we cannot get the standings show a failure
					<div>
						<h6>No standings :(</h6>
						<button
							className="btn btn-danger btn-sm"
							onClick={this.getStandings}>
							Try Again?
						</button>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	  standings: state.currentStandings
	};
}  

export default connect(mapStateToProps)(CurrentStandings);