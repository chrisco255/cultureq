import React, { Component } from 'react';
import HeroImage from './hero_image/HeroImage.component';

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

export default DashboardPage;
