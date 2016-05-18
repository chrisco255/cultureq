import Header from './Header';
import { connect } from 'react-redux';
import React from 'react';
import { login } from '../action_creators';

const mapStateToProps = state => ({
	lock: state.auth.lock
});

const mapDispatchToProps = dispatch => ({
	onLogin: (idToken) => dispatch( login(idToken) )
});

const App = React.createClass({
	//componentWillReceiveProps(nextProps) {
	//	if (nextProps.redirectTo) {
	//		this.context.router.replace(nextProps.redirectTo);
	//		this.props.onRedirect();
	//	}
	//}
	componentWillMount() {
		//if (idToken) {
		//	agent.setToken(token);
		//}
		this.props.onLogin(this.getIdToken());
	},

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
	},

	render() {
		return (
			<div>
				<Header />
				{this.props.children}
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);