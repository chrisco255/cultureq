import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Title.css';

class Title extends Component {
	logIn = () => {
		this.props.lock.show();
	}

	render() {
		return (
			<div className="container">
				<h1 styleName="title">Culture Shock</h1>
				<p>
					What do you want to know? Culture Shock is the best app since Pandr.
				</p>
				<p>
					Sign up today!
				</p>
			</div>
		);
	}
}

export default CSSModules(Title, styles);