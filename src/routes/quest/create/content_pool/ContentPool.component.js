import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import ContentPoolStyles from './ContentPool.css';
import PoolContentItem from '../pool_content_item/PoolContentItem.component';
import { QUEST_CONTENT_ITEM, CONTENT_POOL } from '../ItemTypes';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RightArrow from '../../../../assets/images/right_arrow_white.svg';

const spec = {
  drop(props, monitor, component) {
    const droppedType = monitor.getItem().type;
    if (droppedType === QUEST_CONTENT_ITEM) {
      props.removeContent(monitor.getItem().content);
    }
    return {type: CONTENT_POOL};
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class ContentPool extends Component {

  filterTextChanged = (event) => {
    this.props.changeFilterText(event.target.value);
  };

	render() {
    const { pool, filterText, connectDropTarget, addContent, selectContent, deselectContent, removePlaceholder } = this.props;
    // debugger;

    const selectedContent = pool.filter((content) => {
      return content.isSelected;
    });

    const filteredPool = pool.filter((content) => {
      const text = content.title + content.description;
      const rawText = text.toLowerCase().replace(/\s+/g, '');
      const rawFilterText = filterText.toLowerCase().replace(/\s+/g, '');
      return !rawText || rawText.includes(rawFilterText);
    });

    const contentPoolElements = filteredPool.map((content) => {
			return (
				<PoolContentItem
          key={content._id}
          content={content}
          addContent={addContent}
          selectContent={selectContent}
          deselectContent={deselectContent}
          removePlaceholder={removePlaceholder} />
			);
		});

    //TODO use a JS based animation library to make it so the last removed
    //element does not just dissapear - it should animate out instead
    //temporary half-fix
    // const contentPoolStyles = {};
    // if (contentPoolElements.length === 0) {
    //   contentPoolStyles.display = 'none';
    // }
    let contentPool = (
      // <ReactCSSTransitionGroup component="div"
      //                           style={contentPoolStyles}
      //                           styleName="content-pool"
      //                           transitionName="content-pool-item-transition"
      //                           transitionEnterTimeout={500}
      //                           transitionLeaveTimeout={500}>
      <div styleName="content-pool">
                                {contentPoolElements}
      </div>
      // </ReactCSSTransitionGroup>
    );

    let addAllContentButton = null;
    if (selectedContent.length > 0) {
      const addAll = () => {
        selectedContent.forEach((content) => {
          addContent(content);
        });
      };
      addAllContentButton = (
        <button className="btn-floating btn-large waves-effect waves-light red" styleName="group-button" onClick={addAll}>
          <img src={RightArrow} alt="right arrow" />
        </button>
      );
    }

    let noItemsMessage = null;
    if (contentPoolElements.length === 0) {
      noItemsMessage = <div styleName="no-items-message">All cards used</div>;
    }

    return (
      connectDropTarget(
        <div styleName="content-pool-container">
          <div className="card" styleName="filter-container">
            <div styleName="filter-title">Select Cards</div>
            <div className="input-field" styleName="filter-box-container">
              <i className="material-icons left" styleName="filter-icon">search</i>
              <input id="filter-box" type="text" placeholder="Filter" styleName="filter-field" onChange={this.filterTextChanged}/>
            </div>
          </div>
          {noItemsMessage}
          {contentPool}
          {addAllContentButton}
        </div>
      )
    );
	}

}

ContentPool = CSSModules(ContentPool, ContentPoolStyles);
export default DropTarget(QUEST_CONTENT_ITEM, spec, collect)(ContentPool);
