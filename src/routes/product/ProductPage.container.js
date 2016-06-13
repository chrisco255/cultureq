import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProductPage.css';
import { connect } from 'react-redux';
import { fetchProducts, productSubmitted } from '../../reducers/product/Product.actions';
import ProductForm from './product_form/ProductForm.component';

const query = `
{
 	products {
  	_id
    status
    improvements
    proposal {
      name
    }
	}
}
`;


const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch( fetchProducts({ query }) )
});

class ProductPage extends Component {
	componentDidMount() {
		this.props.onLoad();
	}

	onProductFormSubmit = (values, dispatch) => {
		dispatch( productSubmitted(values) );
	}

	render() {
		return (
			<div className="container">
				<h1 styleName="title">Product Page</h1>
				<ProductForm onSubmit={this.onProductFormSubmit}/>
			</div>
		);
	}
}

ProductPage = connect(null, mapDispatchToProps)(ProductPage);
ProductPage = CSSModules(ProductPage, styles);
export default ProductPage;
