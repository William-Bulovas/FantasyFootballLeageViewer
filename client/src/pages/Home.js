import React, { Component } from 'react';

import { PageHeader, Row, Grid, Col } from 'react-bootstrap';

import CurrentStandings from '../components/CurrentStandings';
import CareerTotals from '../components/CareerTotals';
import StandingsPlot from '../components/StandingsPlot';

export default class Home extends Component {
    render() {
        return (
            <div>
                <PageHeader>
                    Home
                </PageHeader>
                <Grid>
                    <Row>
                        <Col sm={12} md={6}>
                            <CurrentStandings/>
                        </Col>
                        <Col sm={12} md={6}>
                            <CareerTotals mini={true} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={24} md={12}>
                            <StandingsPlot/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}