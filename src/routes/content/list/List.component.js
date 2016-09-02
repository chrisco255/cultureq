import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import Title from './Title.component';
import Filters from './Filters.component';
import Items from './Items.component';

class MyContentList extends Component {

  render() {

    const { contents, filteredContents, setFilteredContents } = this.props;

    return (
      <div className="col s8" styleName="margin-right-95">
        <Title contents={contents} />
        <Filters contents={contents} setFilteredContents={setFilteredContents}/>
        <Items contents={contents} filteredContents={filteredContents} />
      </div>
    );
  }
}

MyContentList.propTypes = {
  contents: PropTypes.array,
  filteredContents: PropTypes.array,
  setFilteredContents: PropTypes.func
};

MyContentList = CSSModules(MyContentList, styles);
export default MyContentList;
