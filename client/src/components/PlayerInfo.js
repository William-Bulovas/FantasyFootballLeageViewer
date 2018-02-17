import React, { Component } from 'react';
import { Table, DropdownButton, MenuItem } from 'react-bootstrap';

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
    state = {year:0}

	render() {    
        const {standings,player} = this.props;

        const rosterRows = [];
        const menuRows = [];
        console.log(player);
        console.log(standings);

        if(player) {
            console.log(player["roster"][0])
            player["roster"][this.state.year]["roster"].forEach((rosterSpot, i) => {
                rosterRows.push(<RosterRow row={rosterSpot}/>);
            });
            player["roster"].forEach((year, i) => {
                menuRows.push(<MenuItem eventKey={i} key={i}>{year["year"]}</MenuItem>);                
            })
        }

        return (
            <div>
                <h3>{standings["manager"][0]["nickname"]}</h3>
            
                { player ?
                    <DropdownButton
                                bsStyle={'Default'}
                                title={player["roster"][this.state.year].year}
                                id={'dropdown-basic-Default'}
                                onSelect={(key, e) => {
                                    this.setState({
                                        year : key
                                    })
                                }}
                            >
                                {menuRows}
                    </DropdownButton>
                    : <div/>
                }

                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Team</th>
                            <th>Player</th>
                        </tr>
                    </thead>
                    <tbody>{rosterRows}</tbody>
                </Table>
            </div>
        );
    }
}
