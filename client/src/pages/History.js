import React, { Component } from 'react';

import AllStandings from '../components/AllStandings';

export default class History extends Component {
    render() {
        return (
            <div>
                <div className='row mt-3'>
                    <h3>
                        History
                    </h3>
                </div>
                <div className='row mt-3'>
                    <AllStandings/>
                </div>
            </div>
        )
    }
}