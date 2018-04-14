import React, { Component } from 'react';
import { Table, DropdownButton, MenuItem } from 'react-bootstrap';

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
        for (var i = 16; i >0; i--){
            weekRows.push(<MenuItem eventKey={i} key={i}>{i}</MenuItem>);
        }

        if(standings) {
            standings["results"].forEach((year, i) => {
                yearRows.push(<MenuItem eventKey={i} key={i}>{year["year"]}</MenuItem>);                
            })
        }

        var week = this.state.week;

        return (
            <div>
                <h3>{standings["manager"][0]["nickname"]}</h3>
            
                { standings ?
                    <div>
                        <DropdownButton
                                    bsStyle={'Default'}
                                    title={"Season: " + standings["results"][this.state.year].season}
                                    id={'dropdown-basic-Default'}
                                    onSelect={(key, e) => {
                                        this.setState({
                                            year : key
                                        })
                                    }}
                                >
                                    {yearRows}
                        </DropdownButton>
                        
                    
                        <DropdownButton
                                        bsStyle={'Default'}
                                        title={"Week " + week}
                                        id={'dropdown-basic-Default'}
                                        onSelect={(key, e) => {
                                            this.setState({
                                                week : key
                                            })
                                        }}
                                    >
                                        {weekRows}
                        </DropdownButton>
                    </div>
                    : <div/>}
                
                <PlayerWeekInfo week={week} teamId={this.props.standings["results"][this.state.year].team_key}/>
            </div>
        );
    }
}
