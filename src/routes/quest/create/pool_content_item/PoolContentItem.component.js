import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import CSSModules from 'react-css-modules';
import PoolContentStyles from './PoolContentItem.css';
import { POOL_CONTENT_ITEM } from '../ItemTypes';
import RightArrow from '../../../../assets/images/right_arrow_gray.svg';
import EditIcon from '../../../../assets/images/icon-edit.svg';

const spec = {
  beginDrag(props) {
    return {
      content: props.content,
      type: POOL_CONTENT_ITEM,
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      //it is possible that a pool content item that failed to drop leaves
      //a stranded placeholder in the quest content area
      //although that placehodler will not be rendered due to the isOver safeguard built
      //in to the quest content area, that placeholder should be removed in any case
      //because it is likely semantically correct to do so
      props.removePlaceholder();
    }
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

class PoolContentItem extends Component {

	render() {
    const {
      content,
      connectDragSource,
      addContent,
      selectContent,
      deselectContent,
      isDragging,
      connectDragPreview
    } = this.props;

    const styles = {};
    if (content.isSelected) styles.backgroundColor = '#f1f1f1';
    if (isDragging) styles.opacity = 0.2;
    const selectToggle = content.isSelected ? deselectContent : selectContent;

    const addContentWrapper = (event, content) => {
      //stop bubbling of events because if bubbling events make it so that
      //a select event fires right after the add event and causes problems
      event.preventDefault();
      event.stopPropagation();
      addContent(content);
    };

    const onEdit = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      connectDragSource(
        <div className="card" styleName="content-card" style={styles} onClick={() => {selectToggle(content);}}>
          {connectDragPreview(
          <div className="card-content" styleName="card-content">
            <div styleName="card-column">
              <div styleName="card-text">
                <div className="card-title" styleName="card-title">{content.title}</div>
                <div styleName="card-description">{content.description}</div>
              </div>
              <div styleName="bottom-buttons">
                 <a className="waves-effect waves-default btn-flat" styleName="button" onClick={onEdit}><img src={EditIcon} alt="Edit Icon" />edit</a>
              </div>
            </div>
            <div styleName="card-column">
              <div styleName="side-buttons">
                <img styleName="button" src={RightArrow} alt="right arrow" onClick={(event) => {addContentWrapper(event, content);}}/>
              </div>
            </div>
          </div>
        )}
        </div>
      )
    );
	}

}

PoolContentItem = CSSModules(PoolContentItem, PoolContentStyles);
export default DragSource(POOL_CONTENT_ITEM, spec, collect)(PoolContentItem);
