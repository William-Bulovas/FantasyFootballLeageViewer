import React, { Component } from 'react';

import { PageHeader } from 'react-bootstrap';

import AllStandings from '../components/AllStandings';

export default class History extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    History
                </PageHeader>
                <AllStandings/>
            </div>
        )
    }
}