import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import ContentTypes from '../ContentTypes';

class SideMenu extends Component {
  render() {

    const { currentContentType, formEnable, isCreatingContent } = this.props;

    return (
      <div styleName="background">
        <div>
          <h1 styleName="side-menu-title">Select Content Type</h1>
        </div>
        <div>
          {
            Object.keys(ContentTypes.properties).map( (type) => {
              const isActive = (type === currentContentType);
              const { value, name, description } = ContentTypes.properties[type];

              return (
                <div key={value} styleName={isActive ? 'active-item': 'padding-15'} onClick={formEnable.bind(this, isCreatingContent, value)}>
                  <h5 styleName="margin-bottom-2">{name}</h5>
                  <p styleName="margin-top-0">{description}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  currentContentType: PropTypes.string,
  formEnable: PropTypes.func,
  isCreatingContent: PropTypes.bool
};

SideMenu = CSSModules(SideMenu, styles);
export default SideMenu;
