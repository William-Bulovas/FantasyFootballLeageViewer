import React, { Component } from 'react';

import { PageHeader } from 'react-bootstrap';

import CurrentStandings from '../components/CurrentStandings';
import CareerTotals from '../components/CareerStandings';
import StandingsPlot from '../components/StandingsPlot';

export default class Home extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    Home
                </PageHeader>
                <CurrentStandings/>
                <CareerTotals/>
                <StandingsPlot/>
            </div>
        )
    }
}