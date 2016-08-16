import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './LandingPage.css';

class LandingPage extends Component {
	render() {
		return (
			<div>
				<div styleName="app-header">
					<div className="container">
						<div styleName="app-title">CultureQ</div>
						<div styleName="app-description">A culture and engagement platform that helps companies grow stronger bonds with their people.</div>
					</div>
				</div>
				<div styleName="selling-point-header">
					<div className="accent-background" styleName="alignment"></div>
					<div styleName="selling-point-header-text">Aligns employees to key values</div>
					<div styleName="selling-point-header-subtext">
						CultureQ helps you define key cultural values for your company and create targeted, engaging content to propagate to your workforce.
					</div>
				</div>
				<div styleName="selling-point-header">
					<div className="accent-background" styleName="feedback"></div>
					<div styleName="selling-point-header-text">Promotes two way feedback across organizations</div>
					<div styleName="selling-point-header-subtext">
						Get a sense of your company's overall engagement and sentiment index. Our mobile app pulses periodic check-in questions to employees,
						prompting critical, real-time feedback on a range of important issues.
					</div>
				</div>
				<div styleName="selling-point-header">
					<div className="accent-background" styleName="analytics"></div>
					<div styleName="selling-point-header-text">Gives you insight into how to improve employee engagement</div>
					<div styleName="selling-point-header-subtext">
						Get a sense of overall engagement and alignment with CultureQ's advanced analytics engine.
					</div>
				</div>
				<div styleName="selling-point-header">
					<div className="accent-background" styleName="fire"></div>
					<div styleName="selling-point-header-text">Detects and alerts you of potential problems</div>
					<div styleName="selling-point-header-subtext">
						Be proactive, not just reactive, about retention and engagement in your organization! Our real time alerts let you know when
						potential problems arise across departments, locations, or job role groups.
					</div>
				</div>
			</div>
		);
	}
}

LandingPage = CSSModules(LandingPage, styles);
export default LandingPage;
