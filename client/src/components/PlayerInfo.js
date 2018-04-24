import React, { Component } from 'react';

import PlayerWeekInfo from './PlayerWeekInfo';

class RosterRow extends Component {
	render() {
		const row = this.props.row;
		return (
			<tr>
                <td>{row["display_position"]}</td>
				<td>{row["editorial_team_abbr"]}</td>
				<td>{row["name"]["full"]}</td>
			</tr>
		);
	}
}


export default class PlayerInfo extends Component {
    state = {year:0,week:16}

	render() {    
        const { standings } = this.props;

        const yearRows = [];
        const weekRows = [];

        Array(16).fill().forEach((week, i) => 
            weekRows.push(
                <a eventKey={i} key={i} className="dropdown-item" onClick={
                    () => this.setState({
                        week : i + 1
                    })
                }>
                    {i + 1}
                </a>
            )
        );

        if(standings) {
            standings["results"].forEach((year, i) => {
                yearRows.push(
                    <a eventKey={i} key={i} className="dropdown-item" onClick={
                        () => this.setState({
                            year : i
                        })
                    }>
                        {year["season"]}
                    </a>
                );                
            })
        }

        var week = this.state.week;

        return (
            <div className='col-12 col-md-9 col-xl-8 py-md-3 pl-md-5'>
                <div className='row mt-3'>
                    <h3>
                        {standings["manager"][0]["nickname"]}
                    </h3>
                </div>            
                { standings ?
                    <div>
                        <div className="btn-group float-right mb-3">
							<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								{"Season: " + standings["results"][this.state.year].season}
							</button>
							<div className="dropdown-menu">
                            	{yearRows}
							</div>
						</div>
                    
                        <div className="btn-group float-right mb-3 mr-3">
							<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {"Week " + week}
							</button>
							<div className="dropdown-menu">
                            	{weekRows}
							</div>
						</div>
                    </div>
                    : <div/>}
                
                <PlayerWeekInfo week={week} teamId={this.props.standings["results"][this.state.year].team_key}/>
            </div>
        );
    }
}
