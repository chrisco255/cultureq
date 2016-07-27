import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AnalyticsPage.css';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { fetchAnalytics } from '../../reducers/analytics/Analytics.actions';

const query = `
{
  analytics {
    tenantCount
    userCount
    managerCount
    employeeCount
    totalPoints
    pillarCount
    contentCount
  }
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		onLoad: () => {
          console.log("dispatching fetchAnalytics")
			    dispatch(fetchAnalytics({ query }))
      }
	}
}

const mapStateToProps = (state) => {
  console.log("Analytics:", state);
	return {
		analytics: state.analytics
	}
}

class Page extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
    console.log('ANALYTICS', this.props.analytics);
    if(this.props.analytics) {
      return (
  			<div styleName="panel">
  				<div styleName="title">Daily Active Users </div>
          <div styleName="count"> {this.props.analytics.userCount} </div>
  			</div>
      );
    } else {
      return (
        <div>
          <div styleName="panel">
    				<div styleName="title">Daily Active Users </div>
            <div styleName="count"> 0 </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Pillars </div>
            <div styleName="count"> 0 </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Total Points </div>
            <div styleName="count"> 0 </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Content </div>
            <div styleName="count"> 0 </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Managers </div>
            <div styleName="count"> 0 </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Tenants </div>
            <div styleName="count"> 0 </div>
    			</div>
        </div>
      );
    }

	}
}

Page = CSSModules(Page, styles);
export default connect(null, mapDispatchToProps)(Page);
