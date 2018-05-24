import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchCareerIfNeeded } from '../reducers/CareerActions';
import ReactLoading from 'react-loading';

import IndividualPlayerPage from '../components/IndividualPlayerPage';

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
            this.setState({selected : listOfPlayers[0]["manager"][0]["guid"]});
        }
        
        const playerRows = listOfPlayers.map((player) => {
            let navLinkClass = "nav-link"
            if (player["manager"][0]["guid"] == this.state.selected) {
                navLinkClass += " active";
            }
            return <div className="nav-link">
                <a className={navLinkClass} href='#' data-toggle="collapse" data-target="#navbarToggler" onClick={() => {
                    this.setState({selected : player["manager"][0]["guid"]});
                }}>
                    {player["manager"][0]["nickname"]}
                </a>
            </div>
        });

        return (
            <div>
                <div className='row mt-3'>
                    <h3>
                        Players
                    </h3>
                </div>
                { this.props.isLoading ? 
                    (
                        <div className="w-100 d-flex justify-content-center" >
                            <ReactLoading type="bars" color="#1919FF"/>
                        </div>
                    ) :
                    (  
                    <div className='row'>
                        <div className='navbar navbar-expand-lg navbar-light bg-light col-12 col-md-3 col-xl-2 bd-sidebar border mr-4 mt-2 mb-3'> 
                            <button class="btn btn-link bd-search-docs-toggle d-md-none p-0 ml-3 collapsed" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle docs navigation"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false">
                                <title>Menu</title>
                                <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>
                            </button>
                            <nav className='collapse navbar-collapse flex-column h-100 nav nav-pills' id="navbarToggler">
                                    {playerRows} 
                            </nav>
                        </div>
                    {listOfPlayers.length > 0  && this.state.selected != "default" ? 
                        <IndividualPlayerPage standings={standingsList[this.state.selected]} 
                                              selectedId={this.state.selected}/>
                        : <li/>
                    }
                    </div>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
	return {
        standingsList: state.career,
        isLoading: state.isFetchingCareer
	};
}  

export default connect(mapStateToProps)(Players);
