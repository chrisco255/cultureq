import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomePage.css';

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
			</div>
		);
	}
}

HomePage = CSSModules(HomePage, styles);
export default HomePage;



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
