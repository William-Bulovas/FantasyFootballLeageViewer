import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class StandingsRow extends Component {
  render() {
    const row = this.props.row;
    console.log(row);
    return (
      <tr>
        <td>{row["name"]}</td>
        <td>{row["standings"]["outcome_totals"]["wins"]}</td>
        <td>{row["standings"]["outcome_totals"]["losses"]}</td>
        <td>{row["standings"]["points_for"]}</td>
        <td>{row["standings"]["points_against"]}</td>

        </tr>
    );
  }
}

class Standings extends Component {
  state = { standingsList: [] }

  componentDidMount() {
    this.getStandings();
  }


  getStandings = () => {
    fetch('api/league/standings/current')
      .then(res => res.json())
      .then(standingsList => this.setState({standingsList}));
  }


  render() {    
    const { standingsList } = this.state;
    console.log(standingsList["standings"]);

    const rows = [];
    if (Object.values(standingsList).length) {
      standingsList["standings"].forEach((row) => {
        rows.push(<StandingsRow row={row} key={row["team_id"]}/>);
      });
    }

    return (

      <div className="Standing">
        {Object.values(standingsList).length ? (
          <div>
            <h1>Current Standings</h1>
            <table>
              <thead>
              <tr>
                  <th>Team</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Points For</th>
                  <th>Points Against</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
          </div>
        ) : (
          // If we cannot get the standings show a failure
          <div>
          <h1>No standings :(</h1>
          <button
            className="tryagain"
            onClick={this.getStandings}>
            Try Again?
          </button>
        </div>
        )}
      </div>
    );
  }
}

class CareerTotals extends Component {
  state = { standingsList: [] }

  componentDidMount() {
    this.getStandings();
  }


  getStandings = () => {
    fetch('api/league/standings/')
      .then(res => res.json())
      .then(standingsList => this.setState({standingsList}));
  }


  render() {    
    const { standingsList } = this.state;
    console.log(standingsList);

    const rows = [];
    if (Object.values(standingsList).length) {
      standingsList["standings"].forEach((row) => {
        rows.push(<StandingsRow row={row} key={row["team_id"]}/>);
      });
    }

    return (

      <div className="Standing">
        {Object.values(standingsList).length ? (
          <div>
            <h1>Current Standings</h1>
            <table>
              <thead>
              <tr>
                  <th>Team</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Points For</th>
                  <th>Points Against</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
          </div>
        ) : (
          // If we cannot get the standings show a failure
          <div>
          <h1>No standings :(</h1>
          <button
            className="tryagain"
            onClick={this.getStandings}>
            Try Again?
          </button>
        </div>
        )}
      </div>
    );
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Throw up the X Fantasy Football League</h1>
        </header>
        <Standings/>
        <CareerTotals/>
      </div>
    );
  }
}

export default App;
