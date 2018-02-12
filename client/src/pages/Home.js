import React, { Component } from 'react';

import { PageHeader } from 'react-bootstrap';

import Standings from '../components/Standings';
import CareerTotals from '../components/CareerStandings';


export default class Home extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    Home
                </PageHeader>
                <Standings/>
                <CareerTotals/>
            </div>
        )
    }
}