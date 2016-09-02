import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';
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
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1.68rem', color: '#4a4a4a'}}>
        <div style={{display: 'flex', justifyContent: 'center', width: '165px', paddingLeft: '17px'}}>
          <a className='dropdown-button' data-activates='type-dropdown' style={{display: 'flex', color: '#4a4a4a'}}>Type<i className="material-icons">arrow_drop_down</i></a>
          <ul id='type-dropdown' className='dropdown-content' style={{boxShadow: '0 6px 28px 0 rgba(0, 0, 0, 0.25),0 6px 24px 0 rgba(0,0,0,0.12)', backgroundColor: '#f5f5f5'}}>
            <li onClick={this.filterBy.bind(this, '')} ><a style={{display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#4a4a4a'}}>Type<i className="material-icons">arrow_drop_up</i></a></li>
            <li className="divider"></li>
            {Object.keys(ContentTypes.properties).map((type) => {
              return (
                <li key={type} onClick={this.filterBy.bind(this, type)} style={{minHeight: '35px'}}>
                  <a styleName="typeItem">{ContentTypes.properties[type].name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '165px', paddingRight: '5px'}}>Modified<i className="material-icons">arrow_drop_down</i></div>
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
