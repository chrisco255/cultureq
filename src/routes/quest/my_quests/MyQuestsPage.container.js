import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './MyQuestsPage.css';
import {
	changeQuestFilterText
} from '../../../reducers/quest/Quest.actions';
import {
	IN_PROGRESS,
	PUBLISHED
} from './QuestStatusEnum';
import TrendingQuest from './trending_quest/TrendingQuest.component';
import StatusContainer from './status_container/StatusContainer.component';
import RecommendedQuest from './recommended_quest/RecommendedQuest.component';

const mapDispatchToProps = (dispatch) => {
	return {
		changeFilterText: (text) => {
			dispatch(changeQuestFilterText(text));
		}
	};
};

const mapStateToProps = (state) => {
	return {
    quests: state.quest.quests,
    filterText: state.quest.questFilterText,
    recommended: state.quest.recommendedQuest,
    trending: state.quest.trendingQuests
	};
};


class MyQuestsPage extends Component {

	filterTextChanged = (event) => {
		this.props.changeFilterText(event.target.value);
	};

	getQuestsWithStatus(status) {
		let quests = this.props.quests.filter((quest) => {
			return quest.status === status;
		});
		quests = quests.filter((quest) => {
			const text = quest.title + quest.description;
      const rawText = text.toLowerCase().replace(/\s+/g, '');
      const rawFilterText = this.props.filterText.toLowerCase().replace(/\s+/g, '');
      return !rawText || rawText.includes(rawFilterText);
		});
		return quests;
	}

	render() {
		const { filterText, recommended, trending } = this.props;

		const inProgressQuests = this.getQuestsWithStatus(IN_PROGRESS);
		const publishedQuests = this.getQuestsWithStatus(PUBLISHED);

		const trendingQuestElements = trending.map((quest, index) => {
			return <TrendingQuest key={index} quest={quest} />;
		});

    return (
      <div styleName="my-quests-page">
  			<div styleName="create-quest-container">
          <a className="white-text waves-effect waves-light btn accent-background" styleName="create-quest-button"><i className="material-icons left">add</i>Create Quest</a>
        </div>
        <div styleName="filter-container">
          <div className="input-field" styleName="filter-box-container">
            <i className="material-icons left" styleName="filter-icon">search</i>
            <input id="filter-box" type="search" placeholder="Filter" styleName="filter-field" onChange={this.filterTextChanged}/>
          </div>
        </div>
        <div styleName="main-content">
          <div styleName="all-quests">
						<StatusContainer name="In Progress" quests={inProgressQuests} />
						<StatusContainer name="Published" quests={publishedQuests} />
          </div>
          <div styleName="featured-quests">
            <div styleName="featured-quest-container">
              <div styleName="title">Recommended</div>
							<RecommendedQuest quest={recommended} />
            </div>
            <div styleName="featured-quest-container">
              <div styleName="title">Trending Now</div>
              <div styleName="trending-quests">
								{trendingQuestElements}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
	}

}

MyQuestsPage = CSSModules(MyQuestsPage, styles);
export default connect(mapStateToProps, mapDispatchToProps) (MyQuestsPage);
