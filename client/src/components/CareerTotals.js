import React, { Component } from 'react';
import { Table, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCareerIfNeeded } from '../reducers/CareerActions';

class CareerRow extends Component {
	render() {
		const row = this.props.row;
		const type = this.props.type;
		const mini = this.props.mini;

		var first = 0;
		var second = 0;
		var third =0;

		row["results"].forEach((result) => {
			if(result["result"] == "1") {
				first +=1;
			}
			if(result["result"] == "2") {
				second +=1;
			}

			if(result["result"] == "3") {
				third +=1;
			}

		});

		if (mini) {
			return (
				<tr>
					<td>{row["manager"][0]["nickname"]}</td>
					<td>{first}</td>
					<td>{second}</td>
					<td>{third}</td>
					<td>{row["years_played"]}</td>
				</tr>
			);
		}
		return (
			<tr>
				<td>{row["manager"][0]["nickname"]}</td>
				<td>{first}</td>
				<td>{second}</td>
				<td>{third}</td>
				<td>{row["years_played"]}</td>

				<td>{type == 0 ? row["wins"]
						: (parseInt(row["wins"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["losses"]
						: (parseInt(row["losses"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["pointsFor"]
						: (parseInt(row["pointsFor"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["pointsAgainst"]
						: (parseInt(row["pointsAgainst"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["movesMade"]
						: (parseInt(row["movesMade"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["tradesMade"]
						: (parseInt(row["tradesMade"]) / parseInt(row["years_played"])).toFixed(2)}</td>
			</tr>
		);
	}
}


class CareerTotals extends Component {
	state = { typeOfStats: 0 }

	componentDidMount() {
		this.getStandings();
	}

	getStandings = () => {		
		this.props.dispatch(fetchCareerIfNeeded());
	}

	render() {    
		const { career } = this.props;
		const { typeOfStats } = this.state;
		const { mini } = this.props;

		if (career == null){
			return (
				<div>
					<h6>No standings :(</h6>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>
			)
		}

		var listOfPlayers = Object.values(career);

		listOfPlayers.sort(function(a,b) {
			if (a["wins"] == b["wins"]){
				return a["pointsFor"] - b["pointsFor"];
			}
			return a["wins"] - b["wins"];
		});
		listOfPlayers.reverse();

		const rows = [];
		if (Object.values(career).length) {
			listOfPlayers.forEach((row) => {
				rows.push(<CareerRow row={row} key={row["manager"]["guid"]} type={typeOfStats} mini={mini}/>);
			});
		}

		const preTotal = typeOfStats == 0 ? "Total" : "Ave.";

		return (

			<div className="Standing">
				{rows.length ? (
					<div>
						{ !mini ? (
							<div className="btn-group float-right mr-3">
								<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									{typeOfStats == 0 ? "Aggregate" : "Average" }
								</button>
								<div className="dropdown-menu">
									<a className="dropdown-item" onClick={
										() => this.setState({
											typeOfStats : 0
										})
									}>
										Aggregate
									</a>
									<a className="dropdown-item" onClick={
										() => this.setState({
											typeOfStats : 1
										})
									}>
										Average
									</a>
								</div>
							</div>)
						: ( <div/> )}
						<table className='table table-bordered table-striped table-hover'>
							<thead>
								{ mini ? 
									(<tr>
										<th>Team</th>
										<th>First</th>
										<th>Secound</th>
										<th>Third</th>
										<th>Years Played</th>
									</tr>)
								: ( <tr>
										<th>Team</th>
										<th>First</th>
										<th>Secound</th>
										<th>Third</th>
										<th>Years Played</th>
										<th>{preTotal + " Wins"}</th>
										<th>{preTotal + " Loses"}</th>
										<th>{preTotal + " Points For"}</th>
										<th>{preTotal + " Points Against"}</th>
										<th>{preTotal + " Moves"}</th>
										<th>{preTotal + " Trades"}</th>
									</tr>)
								}
							</thead>
							<tbody>{rows}</tbody>
						</table>
					</div>
				) : (
					// If we cannot get the standings show a failure
					<div>
						<h1>No standings :(</h1>
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

CareerTotals.defaultProps = {
	mini: false
};

function mapStateToProps(state) {
	return {
	  career: state.career
	};
}  

export default connect(mapStateToProps)(CareerTotals);
