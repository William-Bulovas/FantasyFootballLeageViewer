import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import Standings from './Standings';
import CareerStandings from './CareerTotals';


export default class AllStandings extends Component {    
	state = { allStandings: [], year:0 }
    
    componentDidMount() {
        this.getStandings();
    }


    getStandings = () => {
        fetch('api/league/standings/')
            .then(res => res.json())
            .then(allStandings => this.setState({allStandings}));
    }
    
	render() {   
        const { allStandings } = this.state;        
        const { year } = this.state;        
        
        const menuRows = [];
        menuRows.push(
            <MenuItem eventKey={0} key={0}> 
                Career
            </MenuItem>);

        allStandings.forEach((year, i) => menuRows.push(
            <MenuItem eventKey={i+1} key={i+1}>
                {year.season}
            </MenuItem>
        ));

		return (
			<div className="Standing">
                <div>
                {allStandings.length ? (
					<div>
						<DropdownButton
							bsStyle={'Default'}
							title={year == 0 ? "Career" : allStandings[year-1].season}
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
                            : <Standings standings={allStandings[year-1]}/>
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
