import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';
import _ from 'lodash';
import ContentTypes from '../ContentTypes';
import { Link } from 'react-router';

class Items extends Component {

  render () {

    const { contents, filteredContents } = this.props;

    let activeContents = [];

    if(!_.isEmpty(filteredContents)) {
      activeContents = filteredContents.filter((content) => !content.isDeleted);
    } else {
      activeContents = contents;
    }

    const contentItems = activeContents.map((content, index) => {
      let currentItemType = '';
      let currentItemTitle = '';
      let contentItemIcon = '';
      let currentItemInfo = '';
      if (ContentTypes.QUOTE === content.type) {
        currentItemType = ContentTypes.QUOTE;
        currentItemTitle = content.data.quote;
        currentItemInfo = content.data.author;
        contentItemIcon = (<i className="material-icons">{ContentTypes.properties[currentItemType].icon}</i>);
      }
      if (ContentTypes.VIDEO === content.type) {
        currentItemType = ContentTypes.VIDEO;
        currentItemTitle = content.data.title;
        currentItemInfo = '01:59';
        contentItemIcon = (<i className="material-icons">{ContentTypes.properties[currentItemType].icon}</i>);
      }
      if (ContentTypes.RICHTEXT === content.type) {
        currentItemType = ContentTypes.properties[ContentTypes.RICHTEXT].name;
        // NOTE: Maybe the richtext/article form should have a subject property?
        currentItemTitle = 'Article on Amazingness';
        currentItemInfo = '2 min read';
        contentItemIcon = (<i className="material-icons">{ContentTypes.properties[ContentTypes.RICHTEXT].icon}</i>);
      }
      let itemStyle = {display: 'flex', borderBottom: 'dashed .5px #bdbdbd', justifyContent: 'space-between', marginTop: '20px'};
      if (index === activeContents.length - 1) {
        delete itemStyle.marginTop;
      }
      return (
        <div key={content._id} style={itemStyle}>
          <div className="displayFlex">
            {/*Icon symbol according to type of content*/}
            <div style={{marginRight: '15px', color: '#757575'}}>{contentItemIcon}</div>
            <div style={{width: '375px', marginRight: '50px'}}>
              {/*Quote or Video Title*/}
              <div>
                <div styleName="currentItem"><Link styleName="currentItemLink" to={`addcontent/${currentItemType}`}>{currentItemTitle}</Link></div>
              </div>
              {/*Tags*/}
              <div>
                <p style={{color: '#757575', fontSize: '14px', margin: '5px 0 20px 0'}}><em>No tags, add some</em></p>
              </div>
            </div>
          </div>

          <div style={{display: 'flex', paddingBottom: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 50px 0 50px', color: '#757575', width: '115px'}}>
              <p style={{margin: '0px'}}>{currentItemInfo}</p>
              <p style={{marginTop: '0px', textTransform: 'capitalize'}}>{currentItemType.toLowerCase()}</p>
            </div>

            {/*TODO: Get real created/modified times/dates*/}
            <div style={{display: 'flex', alignItems: 'center', margin: '0 50px 0 50px', color: '#757575', width: '75px', justifyContent: 'center'}}>
              <p style={{marginTop: '0px'}}>56 min ago</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {(_.isEmpty(contentItems)) ? <div>You have no content. <Link to="addcontent">Create content!</Link></div> : contentItems.reverse()}
      </div>
    );
  }
}

Items.propTypes = {
  contents: PropTypes.array,
  filteredContents: PropTypes.array
};

Items = CSSModules(Items, styles);
export default Items;
