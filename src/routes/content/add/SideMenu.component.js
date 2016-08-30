import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';
import ContentTypes from '../ContentTypes';

class SideMenu extends Component {
  render() {

    const { currentContentType, formEnable, isCreatingContent } = this.props;

    return (
      <div style={{backgroundColor: 'rgba(117, 117, 117, 0.04)', height: '100em', width: '15%'}}>
        <div>
          <h1 style={{padding: '2.1rem 0 1.68rem 15px', margin: 'auto'}}>Select Content Type</h1>
        </div>
        <div>
          {
            Object.keys(ContentTypes.properties).map( type => {
              const isActive = (type === currentContentType);
              const { value, name, description } = ContentTypes.properties[type];

              return (
                <div key={value} style={isActive ? {padding: '15px 15px 15px 15px', backgroundColor: 'white', borderBottom: 'solid rgba(117, 117, 117, 0.06) 1px'} : {padding: '15px 15px 15px 15px'}} onClick={formEnable.bind(this, isCreatingContent, value)}>
                  <h5 style={{marginBottom: '2px'}}>{name}</h5>
                  <p style={{marginTop: '0px'}}>{description}</p>
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
