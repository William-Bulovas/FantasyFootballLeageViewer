import React, { Component } from 'react';

import { PageHeader } from 'react-bootstrap';

import Standings from '../components/Standings';

export default class History extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    History
                </PageHeader>
                <Standings/>
            </div>
        )
    }
}