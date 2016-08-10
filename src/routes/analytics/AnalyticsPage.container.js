import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AnalyticsPage.css';
import { connect } from 'react-redux';
import { fetchAnalytics } from '../../reducers/analytics/Analytics.actions';
import AnalyticCard from '../../components/cards/Analytic.component';

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

const mapDispatchToProps = (dispatch) => ({
	onLoad() {
    dispatch(fetchAnalytics({ query }));
  }
});

const mapStateToProps = (state) => ({
	analytics: state.analytics
});

class Page extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
    const { analytics } = this.props;

    if(this.props.analytics) {
      return (
        <div className="container">

          <div styleName="card-container">
            <AnalyticCard
              title="Toxic Practices"
              isGood={true}
              isPercentage={false}
              value={3}
              valueChange={-8}
              // valueOutOf={}
              valueUnits="issues"
            />

            <AnalyticCard
              title="Turnovers"
              isGood={false}
              isPercentage={true}
              value={12}
              valueChange={8}
              // valueOutOf={}
              // valueUnits=""
            />

            <AnalyticCard
              title="Completion Rate"
              isGood={true}
              isPercentage={true}
              value={3}
              valueChange={5}
              // valueOutOf={}
              // valueUnits=""
            />

            <AnalyticCard
              title="Happiness Score"
              isGood={true}
              isPercentage={false}
              value={89}
              valueChange={1}
              valueOutOf={100}
              valueUnits="Points"
            />
          </div>








          <div styleName="panel">
    				<div styleName="title">Daily Active Users </div>
            <div styleName="count"> {analytics.userCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Pillars </div>
            <div styleName="count"> {analytics.pillarCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Total Points </div>
            <div styleName="count"> {analytics.totalPoints} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Content </div>
            <div styleName="count"> {analytics.contentCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Managers </div>
            <div styleName="count"> {analytics.managerCount} </div>
    			</div>
          <div styleName="panel">
    				<div styleName="title">Tenants </div>
            <div styleName="count"> {analytics.tenantCount} </div>
    			</div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

	}
}

Page = CSSModules(Page, styles);
export default connect(mapStateToProps, mapDispatchToProps)(Page);
