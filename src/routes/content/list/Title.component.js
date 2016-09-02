import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';

class MyContentListTitle extends Component {
  render() {
    const { contents } = this.props;
    return (
      <div className="displayFlex">
        <h1 style={{margin: '2.1rem 0px 0px 0px'}}>My Content</h1>
        <p className="divider-color" style={{display: 'flex', alignItems: 'center', fontSize: '13px', paddingTop: '6px', margin: '2.1rem 0px 0px 8px'}}>({contents.length})</p>
      </div>
    );
  }
}

MyContentListTitle.propTypes = {
  contents: PropTypes.array
};

MyContentListTitle = CSSModules(MyContentListTitle, styles);
export default MyContentListTitle;
