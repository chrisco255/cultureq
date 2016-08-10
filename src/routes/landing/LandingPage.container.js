import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './LandingPage.css';

class LandingPage extends Component {
	render() {
		return (
			<div styleName="app-header">
				<div className="container">
					<div styleName="app-title">CultureQ</div>
					<div styleName="app-description">A culture and engagement platform that helps companies grow stronger bonds with their people.</div>
				</div>
			</div>
		);
	}
}

LandingPage = CSSModules(LandingPage, styles);
export default LandingPage;
