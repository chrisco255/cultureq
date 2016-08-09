import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import ContentPoolStyles from './ContentPool.css';
import PoolContentItem from '../pool_content_item/PoolContentItem.component';
import { QUEST_CONTENT_ITEM, CONTENT_POOL } from '../ItemTypes';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RightArrow from '../../../assets/images/right_arrow_white.svg';

const spec = {
  drop(props, monitor, component) {
    console.log(`Component ${component} dropped into the content pool`);
    return {type: CONTENT_POOL};
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

class ContentPool extends Component {

	render() {
    const { pool, connectDropTarget, addContent, selectContent, deselectContent } = this.props;

    const selectedContent = pool.filter((content) => {
      return content.isSelected;
    });

    const contentPoolElements = pool.map((content) => {
			return (
				<PoolContentItem
          key={content._id}
          content={content}
          addContent={addContent}
          selectContent={selectContent}
          deselectContent={deselectContent}/>
			);
		});
    let contentPool = (
      <ReactCSSTransitionGroup component="div"
                                styleName="content-pool"
                                transitionName="content-pool-item-transition"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
                                {contentPoolElements}
      </ReactCSSTransitionGroup>
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
      noItemsMessage = <div styleName="no-items-message">No Content Found</div>;
    }

    return (
      connectDropTarget(
        <div styleName="content-pool-container">
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
