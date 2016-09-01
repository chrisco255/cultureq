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
          <div styleName="pillar-container">
            Pillar:<br />
            <div styleName="pillar">{survey.pillar}</div>
          </div>
        </div>
        <div styleName="survey-card-count">{survey.content.length} {survey.content.length === 1 ? 'card' : 'cards'}</div>
        <div styleName="survey-modified-time"><TimeAgo date={new Date(survey.lastModified)} /></div>
      </div>
    );
	}
}

SurveyRow.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pillar: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

SurveyRow = CSSModules(SurveyRow, styles);
export default SurveyRow;
