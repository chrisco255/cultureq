import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProductPage.css';

class ProductPage extends Component {
	render() {
		return (
			<div className="container">
				<h1 styleName="title">Product Page</h1>
			</div>
		);
	}
}

ProductPage = CSSModules(ProductPage, styles);
export default ProductPage;
