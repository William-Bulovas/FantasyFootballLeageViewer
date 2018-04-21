import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { fetchCareerIfNeeded } from '../reducers/CareerActions';

class StandingsPlot extends Component {    
	state = { standingsList: [] }
    
    componentDidMount() {
        this.getStandings();
    }


    getStandings = () => {		
		this.props.dispatch(fetchCareerIfNeeded());
    }
    
	render() {    
        const { career } = this.props;

        if (career) {
            var plotData = [];

            Object.values(career).forEach( (standing) => {
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
                            xaxis: {dtick:1}}}
                    config={{staticPlot: true}}
                    style={{width: 'auto',
                            height: 'auto'}}        
                />
            );
        }
        return (
            <div>
                <h6>No standings :(</h6>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={this.getStandings}>
                    Try Again?
                </button>
            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
	  career: state.career
	};
}  

export default connect(mapStateToProps)(StandingsPlot);
