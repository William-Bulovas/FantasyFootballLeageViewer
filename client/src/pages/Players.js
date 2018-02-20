import React, { Component } from 'react';

import { PageHeader, Button } from 'react-bootstrap';

import PlayerInfo from '../components/PlayerInfo';

export default class Players extends Component {
    state={ standingsList : [], selected : "default" }
    
	componentDidMount() {
        this.getStandings();
	}

	getStandings = () => {
		fetch('api/league/career')
			.then(res => res.json())
			.then(standingsList => this.setState({standingsList}));
    }

    render() {
        const { standingsList } = this.state;
        
        var listOfPlayers = Object.values(standingsList);
        
        listOfPlayers.sort(function(a,b) {
            if (a["wins"] == b["wins"]){
                return a["pointsFor"] - b["pointsFor"];
            }
            return a["wins"] - b["wins"];
        });

        listOfPlayers.reverse();
        
        if (this.state.selected == "default" && listOfPlayers.length > 0) {
            this.setState({'selected' : listOfPlayers[0]["manager"][0]["guid"]});
        }
        
        const playerRows = listOfPlayers.map((player) => 
            <Button onClick={() => {
                this.setState({'selected' : player["manager"][0]["guid"]});
            }}>{player["manager"][0]["nickname"]}</Button>
        );

        return (
            <div>
                <PageHeader>
                    Players
                </PageHeader>
                <ul> {playerRows} </ul>
                {listOfPlayers.length > 0  && this.state.selected != "default" ? 
                    <PlayerInfo standings={standingsList[this.state.selected]}/>

                    : <li/>
                }
            </div>
        )
    }
}