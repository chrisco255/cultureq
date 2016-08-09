import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
// import CSSModules from 'react-css-modules';
// import PoolContentStyles from './PoolContentItem.css';
import { QUEST_CONTENT_ITEM, CONTENT_POOL } from '../ItemTypes';

const dragSourceSpec = {
  beginDrag(props) {
    console.log('beginning drag - ', props.index);
    return {
      id: props.content._id,
      index: props.index,
      type: QUEST_CONTENT_ITEM
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop() && monitor.getDropResult().type === CONTENT_POOL) {
      console.log(`Quest content with name ${props.content.title} dropped in content pool`);
      props.removeContent(props.content);
    }
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
    const draggedIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    console.log('Hover with indeces - ', draggedIndex, hoverIndex);

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
        console.log('Changing order of content cards - ', draggedIndex, hoverIndex);
        props.changeContentOrder(draggedIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
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
    const { content, connectDragSource, connectDropTarget, isDragging } = this.props;

    const styles = {};
    if (isDragging) styles.opacity = 0;

    return (
      connectDragSource(connectDropTarget(
        <div className="card" style={styles}>
          <div className="card-content">
            <div className="card-title">{content.title}</div>
            <div>{content.description}</div>
          </div>
        </div>
      )
    ));
	}

}

// QuestContentItem = CSSModules(QuestContentItem, PoolContentStyles);
QuestContentItem = DragSource(QUEST_CONTENT_ITEM, dragSourceSpec, dragSourceCollect)(QuestContentItem);
QuestContentItem = DropTarget(QUEST_CONTENT_ITEM, dropTargetSpec, dropTargetCollect)(QuestContentItem);
export default QuestContentItem;
