import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomePage.css';
import { Link, IndexLink } from 'react-router';

class HomePage extends Component {
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
				<hr/>
				<Link className="waves-effect waves-light btn" to="/product">Product</Link>
				<br/>
				<br/>
				<Link className="waves-effect waves-light btn" to="/proposal">Proposal</Link>
			</div>
		);
	}
}

HomePage = CSSModules(HomePage, styles);
export default HomePage;
