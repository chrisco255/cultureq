import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import HeroImage from './hero_image/HeroImage.component';

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => ({ });

export class DashboardPage extends Component {
	render = () =>  {
		return (
			<div>
				<HeroImage />
				<h1>Dashboard</h1>
				<p>This is the Dashboard you have achieved reaching the Dashboard. Good Luck.</p>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
