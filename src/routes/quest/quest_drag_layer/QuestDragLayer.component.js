import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import { POOL_CONTENT_ITEM, QUEST_CONTENT_ITEM } from '../ItemTypes';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const collect = (monitor) => {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
};

const getItemStyles = (props, item, itemType) => {
  console.log(props);
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
};


class QuestDragLayer extends Component {

  renderItem = (item, type) => {
    if (type === POOL_CONTENT_ITEM) {
      return (
        <div>THIS IS A POOL CONTENT ITEM PREVIEW</div>
      );
    } else if (type === QUEST_CONTENT_ITEM) {
      return (
        <div>THIS IS A QUEST CONTENT PREVIEW</div>
      );
    } else {
      return null;
    }
  }

	render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(item, itemType)}
        </div>
      </div>
    );
	}

}

export default DragLayer(collect)(QuestDragLayer);
