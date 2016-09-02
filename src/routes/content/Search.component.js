import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ContentPage.css';

class Search extends Component {

  search = (event) => {
    this.props.changeSearchText(event.target.value);
    this.props.setFilteredContents(this.props.contents.filter((content) => {
      const { data } = content;
      const text = data.title + data.description + data.quote + data.author;
      const rawText = text.toLowerCase().replace(/\s+/g, '');
      const rawSearchText = this.props.searchText.toLowerCase().replace(/\s+/g, '');
      return !rawText || rawText.includes(rawSearchText);
    }));
  }

  render() {
    return (
      <div className="row">
        <div className="input-field col s4">
          <i className="material-icons left" styleName="icon-position">search</i>
          <input ref="searchInput" id="search" placeholder="Search" type="search" className="validate" styleName="padding-left-35" onChange={this.search} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  changeSearchText: PropTypes.func,
  contents: PropTypes.array,
  setFilteredContents: PropTypes.func,
  searchText: PropTypes.string
};

Search = CSSModules(Search, styles);
export default Search;
