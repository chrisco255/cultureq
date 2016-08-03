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
	return {
		analytics: state.analytics
	}
}

class Page extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {

    if(this.props.analytics) {
      return (
        <div>
          <div styleName="panel">
    				<div styleName="title">Daily Active Users </div>
            <div styleName="count"> {this.props.analytics.userCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Pillars </div>
            <div styleName="count"> {this.props.analytics.pillarCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Total Points </div>
            <div styleName="count"> {this.props.analytics.totalPoints} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Content </div>
            <div styleName="count"> {this.props.analytics.contentCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Managers </div>
            <div styleName="count"> {this.props.analytics.managerCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Tenants </div>
            <div styleName="count"> {this.props.analytics.tenantCount} </div>
    			</div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>naw.</h1>
        </div>
      );
    }

	}
}

Page = CSSModules(Page, styles);
export default connect(mapStateToProps, mapDispatchToProps)(Page);
