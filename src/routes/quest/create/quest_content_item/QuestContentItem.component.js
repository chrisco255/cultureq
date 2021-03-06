import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import styles from './QuestContentItem.css';
import { QUEST_CONTENT_ITEM, CONTENT_POOL, POOL_CONTENT_ITEM, QUEST_CONTENT_AREA } from '../ItemTypes';
import QuestContentDragPlaceholder from '../quest_content_drag_placeholder/QuestContentDragPlaceholder.component';

const dragSourceSpec = {
  beginDrag(props) {
    return {
      content: props.content,
      index: props.index,
      type: QUEST_CONTENT_ITEM
    };
  },
  isDragging(props, monitor) {
    let isDragging = false;
    const draggedType = monitor.getItem().type;
    if (draggedType === QUEST_CONTENT_ITEM || draggedType === POOL_CONTENT_ITEM) {
      isDragging = props.content._id === monitor.getItem().content._id;
    }
    return isDragging;
  },
  endDrag(props, monitor) {
    // if (monitor.didDrop()) {
    //   const dropResultType = monitor.getDropResult().type;
    //   if (dropResultType === CONTENT_POOL) {
    //     props.removeContent(props.content);
    //   }
    // }
  }
};

const dragSourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const dropTargetSpec = {
  hover(props, monitor, component) {
    const DROP_ZONE_INSET = 25;
    const isPointInsideRect = (point, rect) => {
      const xOffset = point.x - rect.x;
      const yOffset = point.y - rect.y;
      const xInside = xOffset >= 0 && xOffset <= rect.width;
      const yInside = yOffset >= 0 && yOffset <= rect.height;
      return xInside && yInside;
    };
    const draggedItem = monitor.getItem();
    const draggedIndex = draggedItem.index;
    const hoverIndex = props.index;

    if (draggedIndex !== hoverIndex) {
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const dropZone = {
        x: hoverBoundingRect.left + DROP_ZONE_INSET,
        y: hoverBoundingRect.top + DROP_ZONE_INSET,
        width: hoverBoundingRect.width - 2 * DROP_ZONE_INSET,
        height: hoverBoundingRect.height - 2 * DROP_ZONE_INSET
      };
      const clientOffset = monitor.getClientOffset();
      if (isPointInsideRect(clientOffset, dropZone)) {
        const nextIndex = hoverIndex;
        props.movePlaceholder(nextIndex, draggedItem.content);
        draggedItem.index = nextIndex;
      }
    }
  }
};

const dropTargetCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
};

class QuestContentItem extends Component {

	render() {
    const { content, connectDragSource, connectDropTarget, isDragging, removeContent, selectContent, deselectContent } = this.props;

    const styles = {};
    // if (isDragging) styles.opacity = .2;
    if (isDragging) styles.display = 'none';
    if (content.isSelected) styles.backgroundColor = '#f1f1f1';

    const selectToggle = content.isSelected ? deselectContent : selectContent;

    const removeContentWrapper = (event, content) => {
      event.preventDefault();
      event.stopPropagation();
      removeContent(content);
    };

    const editContentWrapper = (event) => {
      event.preventDefault();
      event.stopPropagation();
      //edit here
    };

    let toRender = null;
    if (isDragging) {
      toRender = <QuestContentDragPlaceholder />;
    } else {
      toRender = (
        connectDragSource(connectDropTarget(
          <div className="card" style={styles} styleName="quest-content-item" onClick={() => {selectToggle(content);}}>
            <div className="card-content" styleName="card-content">
              <div className="card-title" styleName="card-title">{content.title}</div>
              <div styleName="card-description">{content.description}</div>
            </div>
            <div styleName="buttons">
              <a
                className="waves-effect waves-default btn-flat"
                styleName="button"
                onClick={(event) => {editContentWrapper(event);}}>edit</a>
              <a
                className="waves-effect waves-default btn-flat"
                styleName="button"
                onClick={(event) => {removeContentWrapper(event, content);}}>remove</a>
            </div>
          </div>
        ))
      );
    }

    return toRender;
	}

}

QuestContentItem = CSSModules(QuestContentItem, styles);
QuestContentItem = DragSource(QUEST_CONTENT_ITEM, dragSourceSpec, dragSourceCollect)(QuestContentItem);
QuestContentItem = DropTarget([QUEST_CONTENT_ITEM, POOL_CONTENT_ITEM], dropTargetSpec, dropTargetCollect)(QuestContentItem);
export default QuestContentItem;
