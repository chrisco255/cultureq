import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './SignUpHeader.css';

class SignUpHeader extends Component {
	render() {
		return (
			<div>
				<h1 styleName='title'>Sign Up For Shockingly Good Savings</h1>
				<p styleName='instructions'>Howdy ho!</p>
			</div>
		);
	}
}

export default CSSModules(SignUpHeader, styles);