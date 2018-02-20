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


export default class PlayerWeekInfo extends Component {
    state ={roster:undefined}

    componentDidMount(){
        this.getRoster()
    }

    componentWillReceiveProps(nextProps){
        fetch('api/league/teams/career/' + nextProps.teamId +'-'  + nextProps.week)
        .then(res => res.json())
        .then(res => this.setState({roster: res}))

    }
    
    getRoster(){
        fetch('api/league/teams/career/' + this.props.teamId +'-'  + this.props.week)
            .then(res => res.json())
            .then(res => this.setState({roster: res}))
    }

	render() {    
        const { roster } = this.state;

        console.log("Roster:");
        console.log(roster);
        console.log(this.props.teamId);
        console.log(this.props.week);
        
        const rosterRows = [];
        const menuRows = [];

        if(roster) {
            roster["roster"].forEach((rosterSpot, i) => {
                rosterRows.push(<RosterRow row={rosterSpot}/>);
            });
        }

        return (
            <div>            
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
