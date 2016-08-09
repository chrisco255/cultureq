import React, { Component, PropTypes } from 'react';
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
      SortableLibrary.create(componentBackingInstance, this.props.options);
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
        <div ref={this.sortableContainersDecorator} styleName="sortable-container">
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
      <div styleName="sortable-grid">
        {topLevelElement}
      </div>
    );
	}

}

Sortable.propTypes = {
  mapFunction: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  noItemsMessage: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

Sortable = CSSModules(Sortable, SortableStyles, { allowMultiple: true });
export default Sortable;
