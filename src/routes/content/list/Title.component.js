import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';

class MyContentListTitle extends Component {
  render() {
    const { contents } = this.props;
    return (
      <div className="displayFlex">
        <h1 styleName="title">My Content</h1>
        <p className="divider-color" styleName="content-amount">({contents.length})</p>
      </div>
    );
  }
}

MyContentListTitle.propTypes = {
  contents: PropTypes.array
};

MyContentListTitle = CSSModules(MyContentListTitle, styles);
export default MyContentListTitle;
