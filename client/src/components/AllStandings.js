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
					<h1>No History :(</h1>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>
			)
		}
        
        const menuRows = [];
        menuRows.push(
            <MenuItem eventKey={0} key={0}> 
                Career
            </MenuItem>);

		standings.forEach((year, i) => menuRows.push(
            <MenuItem eventKey={i+1} key={i+1}>
                {year.season}
            </MenuItem>
        ));

		return (
			<div className="Standing">
                <div>
                {standings.length ? (
					<div>
						<DropdownButton
							bsStyle={'Default'}
							title={year == 0 ? "Career" : standings[year-1].season}
							id={'dropdown-basic-Default'}
							onSelect={(key, e) => {
								this.setState({
									year : key
								})
							}}
						>
                            {menuRows}
						</DropdownButton>
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