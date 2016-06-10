import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProposalPage.css';

class ProposalPage extends Component {
	render() {
		return (
			<div className="container">
				<h1 styleName="title">Proposal Page</h1>
			</div>
		);
	}
}

ProposalPage = CSSModules(ProposalPage, styles);
export default ProposalPage;
