import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomePage.css';
import { Link, IndexLink } from 'react-router';

class HomePage extends Component {
	render() {
		return (
			<div className="container">
				<h1>Culture Shock</h1>
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

HomePage = CSSModules(HomePage, styles);
export default HomePage;
