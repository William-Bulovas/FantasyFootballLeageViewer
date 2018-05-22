import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ClientOAuth2 from 'client-oauth2';

import Home from './pages/Home';
import History from './pages/History';
import Players from './pages/Players';

import ResponsiveNavItem from './components/ResponiveNavItem';

import { connect } from 'react-redux';

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

		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<nav collapseOnSelect className='navbar navbar-expand navbar-dark bg-dark'>
							<div class="container">
								<span className='navbar-brand d-none d-md-inline'>Throw up the X Fantasy Football League</span>
								<div className='collapse navbar-collapse'>
									<ul className='navbar-nav mr-auto'>
										<ResponsiveNavItem to='/' imageSrc='/assets/svg/home.svg' text='Home'/>
										<ResponsiveNavItem to='/history' imageSrc='/assets/svg/list.svg' text='History'/>
										<ResponsiveNavItem to='/players' imageSrc='/assets/svg/people.svg' text='Players'/>
									</ul>
									{ !this.props.isLoggedIn ?
										(<button className='btn btn-outline-primary form-inline my-2 my-md-0' onClick={() => {
												window.location.href = requestAuthURI;
											}}>
											Login
										</button>)
										: (<div/>)
									}
								</div>
							</div>
						</nav>						
					</header>
					<div class="container">
						<Route exact path="/" component={Home}/>
						<Route path="/history" component={History}/>
						<Route path="/players" component={Players}/>
						<Route path="/auth/yahoo/:query" component={
							({match}) => {
								this.props.dispatch({
									type: "LOGGED_IN",
									token: this.getJsonFromUrl(window.location.href)['https://fantasyfootballviewer.herokuapp.com/auth/yahoo/callback#access_token'],
									expires_in: this.getJsonFromUrl(window.location.href)['expires_in'],
								});
								return <Redirect to='/' />
							}
						}/>
					</div>
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