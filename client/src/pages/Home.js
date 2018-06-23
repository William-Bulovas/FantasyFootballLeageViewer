import React, { Component } from 'react';

import CurrentStandings from '../components/CurrentStandingsComponent/CurrentStandings';
import MiniCareerTotals from '../components/CareerTotalsComponent/MiniCareerTotals';
import StandingsPlot from '../components/StandingsPlot';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className='row mt-3'>
                    <h3>
                        Home
                    </h3>
                </div>
                <div className='row mt-3'>
                    <div className='col mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 class="card-title">Current Standings</h5>
                                <CurrentStandings/>
                            </div>
                        </div>
                    </div>
                    <div className='col mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 class="card-title">Career Totals</h5>
                                <MiniCareerTotals />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 class="card-title">Career Totals</h5>
                                <StandingsPlot/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}