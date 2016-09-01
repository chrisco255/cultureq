import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './SurveyRow.css';
import TimeAgo from 'react-timeago';

class SurveyRow extends Component {

	render() {
    const { survey } = this.props;

    return (
      <div styleName="content-row">
        <div styleName="survey-info">
          <div styleName="title">{survey.title}</div>
          <div styleName="description">{survey.description}</div>
        </div>
        <div styleName="survey-card-count">{survey.type}</div>
        {survey.statusPercent && <div styleName="survey-card-count">{survey.statusPercent}%</div>}
        <div styleName="survey-modified-time"><TimeAgo date={new Date(survey.lastModified)} /></div>
      </div>
    );
	}
}

SurveyRow.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
		type: PropTypes.string.isRequired,
		statusPercent: PropTypes.number,
  }).isRequired
};

SurveyRow = CSSModules(SurveyRow, styles);
export default SurveyRow;
