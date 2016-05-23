/*
 Container Components are Redux-ified react components which should typically represent a single route/page
 within an application. Their purpose is to map Redux concepts like state from a store and the action dispatcher
 to props that can be passed to child components.

 You should generally avoid placing HTML tags in the render method of this file.  Instead, componentize your route
 like so:

 render = () => {
 return (
	 <div>
		 <HeroImage url={this.props.url} />
		 <FeatureBody { ...this.props } />
	 </div>
 );
 }

 NOTE: The use of ES7-style fat arrow function assignment (as in 'logout = () => {}') ensures that 'this'
 will always refer to the context of the class itself
 */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Title from './title/Title.component.js';

const mapStateToProps = state => ({
	lock: state.auth.lock,
	idToken: state.auth.idToken
});

let mapDispatchToProps = dispatch => ({ });

class HomePage extends Component {
	render() {
		return (
			<Title {...this.props} />
		);
	}
}

HomePage = withRouter(HomePage); // Wrapping in order to have redirect work with this.props.router.push()
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
