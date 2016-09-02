import Header from './header/Header.component';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import AppStyles from './App.component.css';
import { login } from '../reducers/user/User.actions';
import injectTapEventPlugin from 'react-tap-event-plugin';

const mapDispatchToProps = dispatch => ({
	onLogin: (payload) => dispatch( login(payload) )
});

class App extends Component {
	componentWillMount() {
		injectTapEventPlugin(); //needed for Material-UI
		this.props.onLogin( this.getLogin() );
	}

	getLogin = () => {
		let token = null;
		let profile = null;
		try {
			token = window.localStorage.getItem('userToken');
			profile = window.localStorage.getItem('userProfile');
			profile = JSON.parse(profile);
		} catch(err) {
			console.log('Failed to read userToken/userProfile from localStorage ', err);
		}

		return {
			token,
			profile
		};

	}

	render() {
		const { location } = this.props;
		return (
			<div>
				<Header location={location}/>
				<div styleName="main-container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

App = CSSModules(App, AppStyles);
export default connect(null, mapDispatchToProps)(App);
