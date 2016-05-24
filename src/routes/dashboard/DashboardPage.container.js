/*
	Container Components are Redux-ified react components which should typically represent a single route/page
	within an application. Their purpose is to map Redux concepts like state from a store and the action dispatcher
	to props that can be passed to child components

	You should generally avoid placing HTML tags in the render method of this file.  Instead, use components like so:

	render = () => {
		return (
			<div>
				<HeroImage url={this.props.url} />
				<FeatureBody {...this.props} />
			</div>
		);
	}

	NOTE: The use of ES7-style fat arrow function assignment (as in 'logout = () => {}') ensures that 'this'
				will always refer to the context of the class itself
 */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

import FeatureBody from './featurebody/featurebody.component';
import HeroImage from './heroimage/heroimage.component';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

class DashboardPageContainer extends Component {
	logout = () => {
		this.props.router.push('/');
		this.props.onLogOut();
	}

	render = () =>  {
		return (
			<div>
				<HeroImage />
				<FeatureBody />
			</div>
		);
	}
}

DashboardPageContainer = withRouter(DashboardPageContainer);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPageContainer);
