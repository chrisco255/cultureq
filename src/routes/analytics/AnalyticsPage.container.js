import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AnalyticsPage.css';
import { connect } from 'react-redux';
import { fetchAnalytics } from '../../reducers/analytics/Analytics.actions';
import AnalyticCard from '../../components/cards/Analytic.component';
import ReactHighcharts from 'react-highcharts';

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
      pointsByDate {
        date
        count
      }
    }
  }
`;

const afterRender = (chart) => { /* do stuff with the chart  */ };

const mapDispatchToProps = (dispatch) => ({
	onLoad() {
    dispatch(fetchAnalytics({ query }));
  }
});

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
        const { analytics, pointData } = this.props;

        if(this.props.analytics) {
            const config = {
                title: {
                    text: "Culture Points",
                },
                xAxis: {
                    title: {
                        text: "Month",
                    },
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: "Points",
                    }
                },
                series: [{
                    type: 'line',
                    name: 'All',
                    data: analytics.pointsByDate ? analytics.pointsByDate.map((x) => {
                                return [new Date(x.date).getTime(), x.count]
                            }) : []
                }]
            };
          return (
            <div className="container">

              <ReactHighcharts config={config} callback={afterRender}>
              </ReactHighcharts>

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
