import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './MySurveysPage.css';
import {
	changeSurveyFilterText
} from '../../../reducers/survey/Survey.actions';
import {
	IN_PROGRESS,
	PUBLISHED
} from './SurveyStatusEnum';
import TrendingSurvey from './trending_survey/TrendingSurvey.component';
import StatusContainer from './status_container/StatusContainer.component';
import RecommendedSurvey from './recommended_survey/RecommendedSurvey.component';

const mapDispatchToProps = (dispatch) => {
	return {
		changeFilterText: (text) => {
			dispatch(changeSurveyFilterText(text));
		}
	};
};

const mapStateToProps = (state) => {
	return {
    surveys: state.survey.surveys,
    filterText: state.survey.surveyFilterText,
    recommended: state.survey.recommendedSurvey,
    trending: state.survey.trendingSurveys
	};
};


class MySurveysPage extends Component {

	filterTextChanged = (event) => {
		this.props.changeFilterText(event.target.value);
	};

	getSurveysWithStatus(status) {
		let surveys = this.props.surveys.filter((survey) => {
			return survey.status === status;
		});
		surveys = surveys.filter((survey) => {
			const text = survey.title + survey.description;
      const rawText = text.toLowerCase().replace(/\s+/g, '');
      const rawFilterText = this.props.filterText.toLowerCase().replace(/\s+/g, '');
      return !rawText || rawText.includes(rawFilterText);
		});
		return surveys;
	}

	render() {
		const { recommended, trending } = this.props;

		const inProgressSurveys = this.getSurveysWithStatus(IN_PROGRESS);
		const publishedSurveys = this.getSurveysWithStatus(PUBLISHED);

		const trendingSurveyElements = trending.map( (survey, index) => {
			return <TrendingSurvey key={index} survey={survey} />;
		});

    return (
      <div styleName="my-surveys-page">
  			<div styleName="create-survey-container">
          <a className="white-text waves-effect waves-light btn accent-background" styleName="create-survey-button"><i className="material-icons left">add</i>New Survey</a>
        </div>
        <div styleName="filter-container">
          <div className="input-field" styleName="filter-box-container">
            <i className="material-icons left" styleName="filter-icon">search</i>
            <input id="filter-box" type="search" placeholder="Filter" styleName="filter-field" onChange={this.filterTextChanged}/>
          </div>
        </div>
        <div styleName="main-content">
          <div styleName="all-surveys">
						<StatusContainer name="In Progress" surveys={inProgressSurveys} />
						{/* <StatusContainer name="Published" surveys={publishedSurveys} /> */}
          </div>
          <div styleName="featured-surveys">
            <div styleName="featured-survey-container">
              <div styleName="title">Recommended</div>
							<RecommendedSurvey survey={recommended} />
            </div>
            <div styleName="featured-survey-container">
              <div styleName="title">Trending Now</div>
              <div styleName="trending-surveys">
								{trendingSurveyElements}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}

}

MySurveysPage = CSSModules(MySurveysPage, styles);
export default connect(mapStateToProps, mapDispatchToProps) (MySurveysPage);
