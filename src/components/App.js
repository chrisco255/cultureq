//import agent from '../agent';
//import Header from './Header';
import { connect } from 'react-redux';
import React from 'react';

const mapStateToProps = state => ({
	lock: state.lock
});



const mapDispatchToProps = dispatch => ({
	onLoad: (idToken) =>
		dispatch({ type: 'LOGIN', payload: { idToken } })
	//onRedirect: () =>
	//	dispatch({ type: 'REDIRECT' })
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

		this.props.onLoad(this.getIdToken());

	},
	getIdToken() {
		let idToken = window.localStorage.getItem('userToken');
		let authHash = this.props.lock.parseHash(window.location.hash);
		if (!idToken && authHash) {
			if (authHash.id_token) {
				idToken = authHash.id_token;
				localStorage.setItem('userToken', authHash.id_token);
				window.location.hash = '';
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
				{this.props.children}
			</div>
		);
	}
});

//App.contextTypes = {
//	router: React.PropTypes.object.isRequired
//};

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;