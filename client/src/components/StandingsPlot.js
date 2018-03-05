import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Plot from 'react-plotly.js';

export default class StandingsPlot extends Component {    
	state = { standingsList: [] }
    
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

        console.log(standingsList);
        if (standingsList) {
            console.log("here");
            var plotData = [];

            Object.values(standingsList).forEach( (standing) => {
                var x = [];
                var y = [];
                standing.results.forEach( (result) => {
                    x.push(result.season);
                    y.push(result.result);
                });

                var trace = {
                    x:x, 
                    y:y, 
                    type:'scatter',
                    name:standing.manager[0].nickname
                };

                plotData.push(trace);
            });
            console.log(plotData)

            return (
                <Plot
                    data={plotData}
                    layout={{width:1000,
                            height:600,
                            useResizeHandler:true,
                            yaxis: {autorange: 'reversed',
                                    dtick:1},
                            xaxis: {dtick:1},
                            title:'Standings Plot'}}
                    config={{staticPlot: true}}        
                />
            );
        }
            return (
                <div/>
            );
	}
}
