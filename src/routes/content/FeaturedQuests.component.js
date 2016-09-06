import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ContentPage.css';

class FeaturedQuests extends Component {
  render() {
    return (
      <div className="col s3" style={{marginTop: '25px'}}>
        <h2 styleName="quests-title">Featured Quests</h2>
        <div className="card grey lighten-2" styleName="box-shadow-none">
          <div className="card-content black-text" styleName="padding-25">
            <p className="accent-text" styleName="pillar-name-style">people first</p>
            <span className="card-title" styleName="font-size-20">Embrace Community</span>
            <p>Work in progress, loren ipsum doler et situm work in progress, loren ipsum doler et situm.</p>
          </div>
        </div>
      </div>
    );
  }
}

FeaturedQuests.propTypes = {};

FeaturedQuests = CSSModules(FeaturedQuests, styles);
export default FeaturedQuests;
