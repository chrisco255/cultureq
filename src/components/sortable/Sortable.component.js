import React, { Component } from 'react';
import { connect } from 'react-redux';
import SortableLibrary from 'sortablejs';
import CSSModules from 'react-css-modules';
import SortableStyles from './Sortable.css';

class Sortable extends Component {

  // componentDidMount () {
  //   this.updateSortable();
  // }
  //
  // componentDidUpdate () {
  //   this.updateSortable();
  // }
  //
  // updateSortable = () => {
  //
  // }

  sortableGroupDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {
        sort: true,
        group: 'shared',
        onStart: () => {
          console.log('dragging started');
        }
      };
      SortableLibrary.create(componentBackingInstance, options);
    }
  };

  sortableContainersDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {};
      SortableLibrary.create(componentBackingInstance, options);
    }
  };

	render() {
    const elements = this.props.items.map(this.props.mapFunction);

    let topLevelElement;
    if (elements.length > 0) {
      topLevelElement = (
        <div ref={this.sortableContainersDecorator}>
          <div ref={this.sortableGroupDecorator} styleName="sortable-group">
            {elements}
          </div>
        </div>
      );
    } else {
      topLevelElement = (
        <div styleName="no-sortable-items">{this.props.noItemsMessage}</div>
      );
    }
    return (
      <div styleName="sortable-container">
        {topLevelElement}
      </div>
    );
	}

}

Sortable = CSSModules(Sortable, SortableStyles);
export default Sortable;
