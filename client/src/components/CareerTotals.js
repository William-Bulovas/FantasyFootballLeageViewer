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
					<h1>No standings :(</h1>
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

		return (

			<div className="Standing">
				{rows.length ? (
					<div>
						<h1>Career Standings</h1>
						{ !mini ? (<DropdownButton
							bsStyle={'Default'}
							title={typeOfStats == "0" ? "Aggregate" : "Average"}
							id={'dropdown-basic-Default'}
							onSelect={(key, e) => {
								this.setState({
									typeOfStats : key
								})
							}}
						>
							<MenuItem eventKey="0" key="0" 
								>Aggregate</MenuItem>
							<MenuItem eventKey="1" key="1" 
								>Average</MenuItem>

						</DropdownButton>)
						: ( <div/> )}
						<Table striped bordered condensed hover responsive>
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
										<th>Total Wins</th>
										<th>Total Loses</th>
										<th>Total Points For</th>
										<th>Total Points Against</th>
										<th>Total Moves</th>
										<th>Total Trades</th>
									</tr>)
								}
							</thead>
							<tbody>{rows}</tbody>
						</Table>
					</div>
				) : (
					// If we cannot get the standings show a failure
					<div>
						<h1>No standings :(</h1>
						<button
							className="tryagain"
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
