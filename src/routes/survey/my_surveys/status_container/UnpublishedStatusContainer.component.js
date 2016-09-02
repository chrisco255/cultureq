import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusContainer.css';
import SurveyRow from '../survey_row/SurveyRow.component';
import SortingDescending from '../../../../assets/images/sorting-descending.svg';
import SortingAscending from '../../../../assets/images/sorting-ascending.svg';
import SortingArrows from '../../../../assets/images/sorting-arrows.svg';

const SORT_OPTIONS = {
	ASCENDING: 'ASCENDING',
	DESCENDING: 'DESCENDING',
	NONE: 'NONE',
};

const FILTER_OPTIONS = {
	SURVEY: 'SURVEY',
	CHECK_IN: 'CHECK_IN',
	NONE: 'NONE',
};

class StatusContainer extends Component {

  constructor() {
    super();
		this.state = {
			pagination: {
				quantity: 0,
				needsPagination: false,
			},
			expanded: true,
			sorts: {
				modified: SORT_OPTIONS.DESCENDING,
			},
			filters: {
				type: FILTER_OPTIONS.NONE,
			},
		};
  }

  componentWillMount() {
    // initialize pagination
    const INITIAL_PAGINATION_QUANTITY = 5;
    this.increasePaginationQuantity(INITIAL_PAGINATION_QUANTITY, true);
  }

  componentWillReceiveProps(nextProps) {
    const willNeedPagination = this.doesNeedPagination(nextProps.surveys, this.state.pagination.quantity);
    const state = {
      ...this.state,
      pagination: {
        ...this.state.pagination,
        needsPagination: willNeedPagination
      }
    };
    this.setState(state);
  }

  // dirtySet parameter is to enable the usage of this method before the first render has occurred
  // (this method is used in componentWillMount)
  // if setState() is called multiple times before render, subsequent calls to this.state will not reflect
  // the last value passed into this.state
  // thus, since this is used at least twice before render, the first time must dirty set the state so the second
  // invocation of this method is aware of the state changes that occurred the first time
  // the last time this method is invoked before render and all subsequent times, it can use setState (which is
  // why dirtySet is by default false)
  increasePaginationQuantity(increase, dirtySet=false) {
    const { surveys } = this.props;
    let { quantity, needsPagination } = this.state.pagination;
    quantity += increase;
    quantity = Math.min(quantity, surveys.length);
    needsPagination = this.doesNeedPagination(surveys, quantity);
    const state = {
                    ...this.state,
                    pagination: {
                      ...this.state.pagination,
                      quantity,
                      needsPagination
                    }
                  };
    if (dirtySet) {
      this.state = state;
    } else {
      this.setState(state);
    }
  }

  doesNeedPagination(surveys, quantity) {
    return surveys.length > quantity;
  }

  showMoreClicked() {
    const SHOW_MORE_INCREMENT = 5;
    this.increasePaginationQuantity(SHOW_MORE_INCREMENT);
  }

  columnSortToggled(column) {
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
    let { modified } = this.state.sorts;

		if (column === 'modified') {
      modified = incrementSort(modified);
    }

    const state = {
      ...this.state,
      sorts: {
        ...this.state.sorts,
        modified,
      }
    };
    this.setState(state);
  }

	columnFilterToggled(event) {
		event.stopPropagation();
    const state = {
      ...this.state,
      filters: {
        ...this.state.filters,
        type: event.target.value,
      }
    };
    this.setState(state);
  }

  expandToggleClicked() {
    let { expanded } = this.state;
    expanded = !expanded;
    const state = {
      ...this.state,
      expanded,
    };
    this.setState(state);
  }

	render() {
    let { surveys } = this.props;
    const { name } = this.props;

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

    const sortSurveys = (surveys, sorts, filters) => {
      const typeFilter = filters.type;
      const modifiedSort = sorts.modified;

			// filter by type
      if (typeFilter !== FILTER_OPTIONS.NONE) {
        surveys = surveys.filter( (survey) => survey.type === typeFilter );
      }

      // sort by modified date
      if (modifiedSort === SORT_OPTIONS.ASCENDING) {
        surveys.sort( (one, two) => one.lastModified - two.lastModified );
      } else if (modifiedSort === SORT_OPTIONS.DESCENDING) {
        surveys.sort( (one, two) => two.lastModified - one.lastModified );
      }

			return surveys;
    };

    surveys = sortSurveys(surveys, this.state.sorts, this.state.filters);
    const surveyElements = surveys.slice(0, this.state.pagination.quantity).map(
			(survey) => ( <SurveyRow key={survey._id} survey={survey} /> )
		);

		const dropdownItems = [
      'NONE',
      'SURVEY',
			'CHECK_IN',
    ];

    return (
      <div styleName="status-container">
        <h3 styleName="status-name">
          <i
            className="material-icons"
            styleName="expand-trigger"
            onClick={this.expandToggleClicked.bind(this)}>
            {this.state.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
          </i>
          {name}
          <span styleName="status-quantity">({surveys.length})</span>
        </h3>
        {this.state.expanded &&
          <div styleName="surveys">
            <div styleName="header">
              <div styleName="header-row">
                <div styleName="header-cell"></div>
								<div styleName="header-cell">
                  <span styleName="click-box">
                    <select style={{display: 'block'}} defaultValue="NONE" onChange={this.columnFilterToggled.bind(this)}>
											{ dropdownItems.map( (item) => (<option key={item} value={item}>{item}</option>) )}
										</select>
                  </span>
                </div>
                <div styleName="header-cell">
                  <span onClick={this.columnSortToggled.bind(this, 'modified')} styleName="click-box">
                    Modified
                    <img styleName="icon" src={mapSortToIcon(this.state.sorts.modified)} />
                  </span>
                </div>
              </div>
            </div>
            <div styleName="content">
              {surveyElements}
            </div>
            {this.state.pagination.needsPagination &&
              <a
                styleName="show-more"
                onClick={this.showMoreClicked.bind(this)}>Show More</a>
            }
          </div>
        }
      </div>

    );
	}
}

StatusContainer.propTypes = {
  surveys: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired
};

StatusContainer = CSSModules(StatusContainer, styles);
export default StatusContainer;
