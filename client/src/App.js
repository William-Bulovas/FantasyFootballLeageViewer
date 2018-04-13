import React, { Component } from 'react';

import { Navbar, NavItem, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ClientOAuth2 from 'client-oauth2';

import Home from './pages/Home';
import History from './pages/History';
import Players from './pages/Players';

import { connect } from 'react-redux';

import './App.css';

class App extends Component {
	state = { page: 0 }	

	getJsonFromUrl(query) {
		var result = {};
		query.split("&").forEach(function(part) {
		  var item = part.split("=");
		  result[item[0]] = decodeURIComponent(item[1]);
		});
		return result;
	}

	render() {
		const redirect = "https://fantasyfootballviewer.herokuapp.com/auth/yahoo/callback";
		var APP_KEY = process.env.REACT_APP_YAHOO_APP_KEY;
		var APP_SECRET = process.env.REACT_APP_YAHOO_SECRET_KEY;

		var requestAuthURI = "https://api.login.yahoo.com/oauth2/request_auth?client_id=" + APP_KEY + "&redirect_uri=" + redirect + "&response_type=token&language=en-us";
		
		const { page } = this.state;

		const rightStyle = {
			position: "absolute",
			right: "10px",
		};

		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Throw up the X Fantasy Football League</h1>
						{  this.props.isLoggedIn ? 
							<div/>
							:
							<Button style={rightStyle} onClick={() => {
									window.location.href = requestAuthURI;
								}
									}>
								Login
							</Button>
						}
					</header>
					<Navbar collapseOnSelect>
						<Navbar.Header>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav>
								<NavItem componentClass={Link} href='/' to='/'>Home</NavItem>
								<NavItem componentClass={Link} href='/history'to='/history'>History</NavItem>
								<NavItem componentClass={Link} href='/players'to='/players'>Players</NavItem>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
					<Route exact path="/" component={Home}/>
					<Route path="/history" component={History}/>
					<Route path="/players" component={Players}/>
					<Route path="/auth/yahoo/:query" component={
						({match}) => {
							this.props.dispatch({
								type: "LOGGED_IN",
								token: this.getJsonFromUrl(window.location.href)['https://fantasyfootballviewer.herokuapp.com/auth/yahoo/callback#access_token'],
							});
							return <Redirect to='/' />
						}
					}/>
				</div>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
	  isLoggedIn: state.isLoggedIn
	};
  }
  

export default connect(mapStateToProps)(App);