import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AnalyticsPage.css';
import { Link, IndexLink } from 'react-router';
import { fetchAnalytics } from '../../reducers/analytics/Analytics.actions'; 

const query = `
{
  analytics {
    employeesCreated
  }
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		onLoad: () =>
			dispatch(fetchAnalytics({ query }))
	}
}

const mapStateToProps = (state) => {
	return {
		analytics: state.analytics
	}
}

class Page extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		return (
			<div className="container">
				<h1 styleName="title">ANALYTICS</h1>
			</div>
		);
	}
}

Page = CSSModules(Page, styles);
export default Page;
