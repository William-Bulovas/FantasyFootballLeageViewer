import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentStandingsIfNeeded } from '../reducers/CurrentStandingsActions';
import ReactLoading from 'react-loading';

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

		console.log("CurrentLoading = " + this.props.isLoading)		

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
				{this.props.isLoading ?
					<div className="w-100 d-flex justify-content-center" >
                            <ReactLoading type="bars" color="#1919FF"/>
					</div>
				: rows.length ? (
					<div>
						<div className='table-responsive'>
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
	  standings: state.currentStandings,
	  isLoading: state.isFetchingCurrent
	};
}  

export default connect(mapStateToProps)(CurrentStandings);