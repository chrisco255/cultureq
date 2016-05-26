import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './HeroImage.css';

const source = 'http://iordanou.org/wp-content/uploads/2015/04/hero-307036_640.png';

class HeroImage extends Component {
	render() {
		return <img src={source} styleName='hero-img' />;
	}
}

export default CSSModules(HeroImage, styles);