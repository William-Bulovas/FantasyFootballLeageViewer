import React, { Component } from 'react';

import { PageHeader } from 'react-bootstrap';

import CurrentStandings from '../components/CurrentStandings';
import CareerTotals from '../components/CareerStandings';


export default class Home extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    Home
                </PageHeader>
                <CurrentStandings/>
                <CareerTotals/>
            </div>
        )
    }
}