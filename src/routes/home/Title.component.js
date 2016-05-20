import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Title.css';

class Title extends Component {
	showLock = () => {
		this.props.lock.show();
	}

	render() {
		return (
			<div>
				{ this.props.idToken ? <p>LOGGED IN</p> : null }
				<h1 styleName='title'>Hello World</h1>

				{ this.props.idToken ? '' : <button onClick={this.showLock}>Log In</button> }
			</div>
		);
	}
}

export default CSSModules(Title, styles);