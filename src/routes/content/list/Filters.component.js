import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import ContentTypes from '../ContentTypes';

class Filters extends Component {

  filterBy = (type) => {
    this.props.setFilteredContents(this.props.contents.filter((content) => content.type === type));
  };

  render() {

    $('.dropdown-button').dropdown({
       inDuration: 300,
       outDuration: 22,
       constrain_width: false,
       hover: false,
       gutter: 0,
       belowOrigin: false
     }
    );

    return(
      <div styleName="filter-container">
        <div styleName="type-container">
          <a className='dropdown-button displayFlex' data-activates='type-dropdown' styleName="type-link-color">Type<i className="material-icons">arrow_drop_down</i></a>
          <ul id='type-dropdown' className='dropdown-content' styleName="type-dropdown">
            <li onClick={this.filterBy.bind(this, '')} ><a styleName="the-type-item">Type<i className="material-icons">arrow_drop_up</i></a></li>
            <li className="divider"></li>
            {Object.keys(ContentTypes.properties).map((type) => {
              return (
                <li key={type} onClick={this.filterBy.bind(this, type)} styleName="min-height-35">
                  <a styleName="type-item">{ContentTypes.properties[type].name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div styleName="modified-container">Modified<i className="material-icons">arrow_drop_down</i></div>
      </div>
    );
  }
}

Filters.propTypes = {
  contents: PropTypes.array,
  setFilteredContents: PropTypes.func
};

Filters = CSSModules(Filters, styles);
export default Filters;
