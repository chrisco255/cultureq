import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './MyQuestsPage.css';
import {
	changeQuestFilterText
} from '../../reducers/quest/Quest.actions';
import {
	IN_PROGRESS,
	PUBLISHED
} from './QuestStatusEnum';
import TimeAgo from 'react-timeago';
import TimeFormat from '../../components/time_format/TimeFormat.component';
import SortingDescending from '../../assets/images/sorting-descending.svg';
import SortingAscending from '../../assets/images/sorting-ascending.svg';
import SortingArrows from '../../assets/images/sorting-arrows.svg';
import ArrowUp from '../../assets/images/arrow-up-green.svg';
import ArrowDown from '../../assets/images/arrow-down-red.svg';

// const query = `
// {
// 	quests {
//   }
// }
// `;

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

const SORT_OPTIONS = {
	ASCENDING: 'ASCENDING',
	DESCENDING: 'DESCENDING',
	NONE: 'NONE'
};

class MyQuestsPage extends Component {

	constructor() {
		super();
		this.state = {
			pagination: {
				progress: {
					quantity: 0,
					needsPagination: false
				},
				published: {
					quantity: 0,
					needsPagination: false
				}
			},
			progressExpanded: true,
			publishedExpanded: true,
			sorting: {
				progress: {
					items: SORT_OPTIONS.NONE,
					modified: SORT_OPTIONS.DESCENDING
				},
				published: {
					items: SORT_OPTIONS.NONE,
					modified: SORT_OPTIONS.DESCENDING
				}
			}
		};
	}

	componentWillMount() {
		//initialize pagination
		const INITIAL_PAGINATION_QUANTITY = 5;
		const inProgressQuests = this.getQuestsWithStatus(IN_PROGRESS);
		const publishedQuests = this.getQuestsWithStatus(PUBLISHED);
		this.increasePaginationQuantity(IN_PROGRESS, INITIAL_PAGINATION_QUANTITY, inProgressQuests, true);
		this.increasePaginationQuantity(PUBLISHED, INITIAL_PAGINATION_QUANTITY, publishedQuests);
	}

	filterTextChanged = (event) => {
		this.props.changeFilterText(event.target.value);
	};

	//dirtySet parameter is to enable the usage of this method before the first render has occurred
	//(this method is used in componentWillMount)
	//if setState() is called multiple times before render, subsequent calls to this.state will not reflect
	//the last value passed into this.state
	//thus, since this is used at least twice before render, the first time must dirty set the state so the second
	//invocation of this method is aware of the state changes that occurred the first time
	//the last time this method is invoked before render and all subsequent times, it can use setState (which is
	//why dirtySet is by default false)
	increasePaginationQuantity(statusType, increase, quests, dirtySet=false) {
		let objectKey;
		if (statusType === IN_PROGRESS) {
			objectKey = 'progress';
		} else if (statusType === PUBLISHED) {
			objectKey = 'published';
		} else {
			console.log(`Incorrect status type - ${statusType} passed to increasePaginationQuantity in My Quests Page`);
		}
		let { quantity, needsPagination } = this.state.pagination[objectKey];
		quantity += increase;
		quantity = Math.min(quantity, quests.length);
		needsPagination = quests.length > quantity;
		const state = {
										...this.state,
										pagination: {
											...this.state.pagination,
											[objectKey]: {
												quantity,
												needsPagination
											}
										}
									};
		if (dirtySet) {
			this.state = state;
		} else {
			this.setState(state);
		}
	}

	showMoreClicked(statusType, quests) {
		const SHOW_MORE_INCREMENT = 5;
		this.increasePaginationQuantity(statusType, SHOW_MORE_INCREMENT, quests);
	}

	expandToggleClicked(statusType) {
		let objectKey;
		if (statusType === IN_PROGRESS) {
			objectKey = 'progressExpanded';
		} else if (statusType === PUBLISHED) {
			objectKey = 'publishedExpanded';
		} else {
			console.log(`Incorrect status type - ${statusType} passed to expandToggleClicked in My Quests Page`);
		}
		let expandedState = this.state[objectKey];
		expandedState = !expandedState;
		const state = {
			...this.state,
			[objectKey]: expandedState
		};
		this.setState(state);
	}

	columnSortToggled(statusType, column) {
		const incrementSort = (sort) => {
			let newSort;
			if (sort === SORT_OPTIONS.NONE) {
				newSort = SORT_OPTIONS.ASCENDING;
			} else if (sort === SORT_OPTIONS.ASCENDING) {
				newSort = SORT_OPTIONS.DESCENDING;
			} else if (sort === SORT_OPTIONS.DESCENDING) {
				newSort = SORT_OPTIONS.ASCENDING;
			}
			return newSort;
		};
		let objectKey;
		if (statusType === IN_PROGRESS) {
			objectKey = 'progress';
		} else if (statusType === PUBLISHED) {
			objectKey = 'published';
		} else {
			console.log(`Incorrect status type - ${statusType} passed to columnSortToggled in My Quests Page`);
		}
		let itemsSort = this.state.sorting[objectKey].items;
		let modifiedSort = this.state.sorting[objectKey].modified;
		if (column === 'items') {
			itemsSort = incrementSort(itemsSort);
			modifiedSort = SORT_OPTIONS.NONE;
		} else if (column === 'modified') {
			modifiedSort = incrementSort(modifiedSort);
			itemsSort = SORT_OPTIONS.NONE;
		}
		const state = {
			...state,
			sorting: {
				...this.state.sorting,
				[objectKey]: {
					items: itemsSort,
					modified: modifiedSort
				}
			}
		};
		this.setState(state);
	}

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
		const { quests, filterText, recommended, trending } = this.props;

		// const timeAgoFormatter = (value, unit, suffix) {
		//
		// }

		const mapQuestToRow = (quest) => {
			return (
				<div styleName="content-row" key={quest._id}>
    			<div styleName="quest-info">
       			<div styleName="title">{quest.title}</div>
						<div styleName="description">{quest.description}</div>
						<div styleName="pillar-container">
      				Pillar:<br />
							<div styleName="pillar">{quest.pillar}</div>
      			</div>
       		</div>
					<div styleName="quest-card-count">{quest.content.length} {quest.content.length === 1 ? 'card' : 'cards'}</div>
					<div styleName="quest-modified-time"><TimeAgo date={new Date(quest.lastModified)} /></div>
    		</div>
			);
		};

		const sortQuests = (quests, sort) => {
			const itemsSort = sort.items;
			const modifiedSort = sort.modified;
			//sort by item count
			if (itemsSort === SORT_OPTIONS.ASCENDING) {
				quests.sort((one, two) => {
					return one.content.length - two.content.length;
				});
			} else if (itemsSort === SORT_OPTIONS.DESCENDING) {
				quests.sort((one, two) => {
					return two.content.length - one.content.length;
				});
			}
			//sort by modified date
			if (modifiedSort === SORT_OPTIONS.ASCENDING) {
				quests.sort((one, two) => {
					return one.lastModified - two.lastModified;
				});
			} else if (modifiedSort === SORT_OPTIONS.DESCENDING) {
				quests.sort((one, two) => {
					return two.lastModified - one.lastModified;
				});
			}
		};

		const mapSortToIcon = (sort) => {
			let icon;
			if (sort === SORT_OPTIONS.ASCENDING) {
				icon = SortingAscending;
			} else if (sort === SORT_OPTIONS.DESCENDING) {
				icon = SortingDescending;
			} else if (sort === SORT_OPTIONS.NONE) {
				icon = SortingArrows;
			}
			return icon;
		};

		const inProgressQuests = this.getQuestsWithStatus(IN_PROGRESS);
		sortQuests(inProgressQuests, this.state.sorting.progress);
		const inProgressElements = inProgressQuests.slice(0, this.state.pagination.progress.quantity).map(mapQuestToRow);

		const publishedQuests = this.getQuestsWithStatus(PUBLISHED);
		sortQuests(publishedQuests, this.state.sorting.published);
		const publishedElements = publishedQuests.slice(0, this.state.pagination.published.quantity).map(mapQuestToRow);

		const makeStatusContainer = (statusType, statusName, statusKey, expanded, quests, questElements) => {
			return (
				<div styleName="status-container">
					<h3 styleName="status-name">
						<i
							className="material-icons"
							styleName="expand-trigger"
							onClick={this.expandToggleClicked.bind(this, statusType)}>
							{expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
						</i>
						{statusName}
						<span styleName="status-quantity">({quests.length})</span>
					</h3>
					{expanded &&
						<div styleName="quests">
							<div styleName="header">
								<div styleName="header-row">
									<div styleName="header-cell"></div>
									<div styleName="header-cell">
										<span onClick={this.columnSortToggled.bind(this, statusType, 'items')} styleName="click-box">
											Items
											<img styleName="icon" src={mapSortToIcon(this.state.sorting[statusKey].items)} />
										</span>
									</div>
									<div styleName="header-cell">
										<span onClick={this.columnSortToggled.bind(this, statusType, 'modified')} styleName="click-box">
											Modified
											<img styleName="icon" src={mapSortToIcon(this.state.sorting[statusKey].modified)} />
										</span>
									</div>
								</div>
							</div>
							<div styleName="content">
								{questElements}
							</div>
							{this.state.pagination[statusKey].needsPagination &&
								<a
									styleName="show-more"
									onClick={this.showMoreClicked.bind(this, statusType, quests)}>Show More</a>
							}
						</div>
					}
				</div>
			);
		};

		const trendingQuests = trending.map((quest, index) => {
			let arrow;
			let formattedChange;
			if (quest.change >= 0) {
					arrow = <img src={ArrowUp} styleName="change-icon" />;
					formattedChange = <div styleName="change-up">{`+${quest.change}%`}</div>;
			} else if (quest.change < 0){
				arrow = <img src={ArrowDown} styleName="change-icon" />;
				formattedChange = <div styleName="change-down">{`-${Math.abs(quest.change)}%`}</div>;
			}

			return (
				<div styleName="trending-quest" key={index}>
    			{arrow}
					<div styleName="quest-title">{quest.title}</div>
					{formattedChange}
    		</div>
			);
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
						{makeStatusContainer(IN_PROGRESS, 'In Progress', 'progress', this.state.progressExpanded, inProgressQuests, inProgressElements)}
						{makeStatusContainer(PUBLISHED, 'Published', 'published', this.state.publishedExpanded, publishedQuests, publishedElements)}
          </div>
          <div styleName="featured-quests">
            <div styleName="featured-quest-container">
              <div styleName="title">Recommended</div>
              <div styleName="recommended-quest">
								<div styleName="pillar">{recommended.pillar}</div>
								<div styleName="quest-title">{recommended.title}</div>
								<div styleName="description">{recommended.description}</div>
								<div styleName="time">
									<span className="material-icons" styleName="icon">access_time</span>
									<TimeFormat seconds={recommended.time} />
								</div>
              </div>
            </div>
            <div styleName="featured-quest-container">
              <div styleName="title">Trending Now</div>
              <div styleName="trending-quests">
								{trendingQuests}
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
