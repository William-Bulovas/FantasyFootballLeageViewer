import React, { Component } from 'react';

import { PageHeader, Button } from 'react-bootstrap';

import PlayerInfo from '../components/PlayerInfo';

export default class Players extends Component {
    state={ players : [], standingsList : [], selected : "default" }
    
	componentDidMount() {
        this.getRosters();        
        this.getStandings();
	}

	getStandings = () => {
		fetch('api/league/career')
			.then(res => res.json())
			.then(standingsList => this.setState({standingsList}));
    }
    
    getRosters = () => {
        fetch('api/league/teams/career/rosters')
            .then(res => res.json())
            .then(players => this.setState({players}))
    }


    render() {
        const { standingsList } = this.state;
        const { players } = this.state;
        
        var listOfPlayers = Object.values(standingsList);
        
        listOfPlayers.sort(function(a,b) {
            if (a["wins"] == b["wins"]){
                return a["pointsFor"] - b["pointsFor"];
            }
            return a["wins"] - b["wins"];
        });

        listOfPlayers.reverse();
        console.log(players)
        
        if (this.state.selected == "default" && listOfPlayers.length > 0) {
            console.log(listOfPlayers[0]["manager"][0]["guid"]);
            
            this.setState({'selected' : listOfPlayers[0]["manager"][0]["guid"]});
        }
        
        const playerRows = listOfPlayers.map((player) => 
            <Button onClick={() => {
                this.setState({'selected' : player["manager"][0]["guid"]});
                console.log(this.state.selected)

            }}>{player["manager"][0]["nickname"]}</Button>
        );

        console.log(this.state.selected)
        return (
            <div>
                <PageHeader>
                    Players
                </PageHeader>
                <ul> {playerRows} </ul>
                {listOfPlayers.length > 0  && this.state.selected != "default" ? 
                    <PlayerInfo player={players[this.state.selected]} standings={standingsList[this.state.selected]}/>

                    : <li/>
                }
            </div>
        )
    }
}