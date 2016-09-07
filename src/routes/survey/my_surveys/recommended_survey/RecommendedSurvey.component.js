import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './RecommendedSurvey.css';
import TimeFormat from '../../../../components/time_format/TimeFormat.component';

class RecommendedSurvey extends Component {

	render() {
    const { survey } = this.props;

    return (
      <div styleName="recommended-survey">
        <div styleName="pillar">{survey.pillar}</div>
        <div styleName="survey-title">{survey.title}</div>
        <div styleName="description">{survey.description}</div>
        <div styleName="time">
          <span className="material-icons" styleName="icon">access_time</span>
          <TimeFormat seconds={survey.time} />
        </div>
      </div>
    );
	}
}

RecommendedSurvey.propTypes = {
  survey: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pillar: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
};

RecommendedSurvey = CSSModules(RecommendedSurvey, styles);
export default RecommendedSurvey;
