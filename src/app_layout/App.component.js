import Header from './header/Header.component.js';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { login } from '../common/auth/Auth.actions.js';

const mapStateToProps = state => ({
	lock: state.auth.lock
});

const mapDispatchToProps = dispatch => ({
	onLogin: (idToken) => dispatch( login(idToken) )
});

class App extends Component {
	componentWillMount() {
		this.props.onLogin( this.getIdToken() );
	}

	getIdToken() {
		let idToken = window.localStorage.getItem('userToken');
		let authHash = this.props.lock.parseHash(window.location.hash);
		window.location.hash = '';

		if (!idToken && authHash) {
			if (authHash.id_token) {
				idToken = authHash.id_token;
				localStorage.setItem('userToken', authHash.id_token);
			}
			if (authHash.error) {
				console.log("Error signing in", authHash);
				return null;
			}
		}
		return idToken;
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
