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

        if (standingsList) {
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
            return (
                <Plot
                    data={plotData}
                    layout={{
                            yaxis: {autorange: 'reversed',
                                    dtick:1},
                            xaxis: {dtick:1},
                            title:'Standings Plot'}}
                    config={{staticPlot: true}}
                    style={{width: '100%',
                            height: '100%'}}        
                    useResizeHandler={true}
                />
            );
        }
            return (
                <div/>
            );
	}
}
