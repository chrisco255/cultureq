import Header from './header/Header.component';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { login } from '../reducers/user/User.actions';

const mapStateToProps = state => ({
	lock: state.auth.lock
});

const mapDispatchToProps = dispatch => ({
	onLogin: (payload) => dispatch( login(payload) )
});

class App extends Component {
	componentWillMount() {
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
		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
