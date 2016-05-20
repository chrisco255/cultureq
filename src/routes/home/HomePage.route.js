import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import HomePageComponent from './Title.component.js';

const mapStateToProps = state => ({
	lock: state.auth.lock,
	idToken: state.auth.idToken
});

let mapDispatchToProps = dispatch => ({ });

class HomePage extends Component {
	render() {
		return (
			<HomePageComponent {...this.props} />
		);
	}
}

HomePage = withRouter(HomePage); // Wrapping in order to have redirect work with this.props.router.push()
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
