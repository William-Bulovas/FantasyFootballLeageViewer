import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import Standings from './Standings';
import CareerStandings from './CareerTotals';
import { connect } from 'react-redux';
import { fetchStandingsIfNeeded } from '../reducers/StandingsActions';

class AllStandings extends Component {    
	state = { allStandings: [], year:0 }
    
    componentDidMount() {
        this.getStandings();
    }


    getStandings = () => {
		this.props.dispatch(fetchStandingsIfNeeded());
    }
    
	render() {   
        const { standings } = this.props;        
		const { year } = this.state;   
		
		if (standings == null) {
			return (
				<div>
					<h6>No standings :(</h6>
					<button
						className="btn btn-danger btn-sm"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>
			)
		}
        
        const menuRows = [];
        menuRows.push(
            <a className="dropdown-item" eventKey={0} key={0}  onClick={
				() => this.setState({
					year : 0
				})
			}> 
                Career
			</a>);
		menuRows.push(		
			<div className="dropdown-divider"></div>
		);
		standings.forEach((year, i) => menuRows.push(
            <a className="dropdown-item" eventKey={i+1} key={i+1} onClick={
				() => this.setState({
					year : i+1
				})
			}>
                {year.season}
            </a>
        ));

		return (
			<div className="w-100">
                <div>
                {standings.length ? (
					<div>
						<div className="btn-group float-right mb-3">
							<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{year == 0 ? "Career" : standings[year-1].season}
							</button>
							<div className="dropdown-menu">
                            	{menuRows}
							</div>
						</div>
                        {
                            year == "0" ?
                            <CareerStandings />
                            : <Standings standings={standings[year-1]}/>
                        }
					</div>
				) : (
					// If we cannot get the standings show a failure
					<div>
					<h1>No History :(</h1>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>
				)}

                </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
	  standings: state.standings
	};
}  

export default connect(mapStateToProps)(AllStandings);