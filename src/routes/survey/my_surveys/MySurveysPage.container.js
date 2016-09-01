import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './MySurveysPage.css';
import {
	changeSurveyFilterText
} from '../../../reducers/survey/Survey.actions';
import {
	STATUS
} from './Enums';
import TrendingSurvey from './trending_survey/TrendingSurvey.component';
import PublishedStatusContainer from './status_container/PublishedStatusContainer.component';
import UnpublishedStatusContainer from './status_container/UnpublishedStatusContainer.component';
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
		return this.props.surveys.filter( (survey) => {
			return survey.status === status;
		}).filter( (survey) => {
			const text = survey.title + survey.description;
      const rawText = text.toLowerCase().replace(/\s+/g, '');
      const rawFilterText = this.props.filterText.toLowerCase().replace(/\s+/g, '');
      return !rawText || rawText.includes(rawFilterText);
		});
	}

	render() {
		const { recommended, trending } = this.props;

		const unpublishedSurveys = this.getSurveysWithStatus(STATUS.UNPUBLISHED);
		const publishedSurveys = this.getSurveysWithStatus(STATUS.PUBLISHED);

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
						<UnpublishedStatusContainer name="Unpublished" surveys={unpublishedSurveys} />
						<PublishedStatusContainer name="Published" surveys={publishedSurveys} />
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
