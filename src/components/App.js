//import agent from '../agent';
//import Header from './Header';
//import { connect } from 'react-redux';
import React from 'react';

//const mapStateToProps = state => ({
//	appLoaded: state.appLoaded,
//	appName: state.appName,
//	currentUser: state.currentUser,
//	redirectTo: state.redirectTo
//});

//const mapDispatchToProps = dispatch => ({
//	onLoad: (payload, token) =>
//		dispatch({ type: 'APP_LOAD', payload, token, skipTracking: true }),
//	onRedirect: () =>
//		dispatch({ type: 'REDIRECT' })
//});

class App extends React.Component {
	//componentWillReceiveProps(nextProps) {
	//	if (nextProps.redirectTo) {
	//		this.context.router.replace(nextProps.redirectTo);
	//		this.props.onRedirect();
	//	}
	//}

	//componentWillMount() {
	//	const token = window.localStorage.getItem('jwt');
	//	if (token) {
	//		agent.setToken(token);
	//	}
	//
	//	this.props.onLoad(token ? agent.Auth.current() : null, token);
	//}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

//App.contextTypes = {
//	router: React.PropTypes.object.isRequired
//};

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;