import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ContentPage.css';

class Search extends Component {
  render() {
    return (
      <div className="row">
        <div className="input-field col s4">
          <i className="material-icons left" styleName="icon-position">search</i>
          <input id="search" placeholder="Search" type="search" className="validate" styleName="padding-left-35" />
        </div>
      </div>
    );
  }
}

Search.propTypes = {};

Search = CSSModules(Search, styles);
export default Search;
