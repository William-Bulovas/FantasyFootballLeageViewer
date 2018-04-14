import React, { Component } from 'react';

import { PageHeader, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCareerIfNeeded } from '../reducers/CareerActions';

import PlayerInfo from '../components/PlayerInfo';

class Players extends Component {
    state={ selected : "default" }
    
	componentDidMount() {
        this.getStandings();
	}

	getStandings = () => {
		this.props.dispatch(fetchCareerIfNeeded());
    }

    render() {
        const { standingsList } = this.props;

        if (standingsList == null) {
            return (
                <div/>
            )
        }
        
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

function mapStateToProps(state) {
	return {
        standingsList: state.career
	};
}  

export default connect(mapStateToProps)(Players);
