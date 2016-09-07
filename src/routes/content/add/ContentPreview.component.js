import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import ContentTypes from '../ContentTypes';
import Quote from '../../../components/cards/Quote.component';
import Video from '../../../components/cards/Video.component';
import _ from 'lodash';

class ContentPreview extends Component {

  render() {

    const { currentContentType, pillars, contents, deleteContent, editContent, isEditing, contentThatIsBeingEdited, finishEdit, authorChangeContent, quoteChangeContent, titleChangeContent, descriptionChangeContent, urlChangeContent } = this.props;

    let contentCards = [];

    if(contents.length > 0) {
      contentCards = contents.map((content) => {

        let pillarName = content.pillarId;
        const pillarNameIndex = _.findIndex(pillars, (pillar) => pillar._id === content.pillarId);
        if (pillarNameIndex > -1) {
          pillarName = pillars[pillarNameIndex].name;
        }
        if (content.type === ContentTypes.QUOTE) {
          return (
            <div>
                <Quote pillarName={pillarName} deleteContent={deleteContent} content={content} editContent={editContent} isEditing={isEditing} contentThatIsBeingEdited={contentThatIsBeingEdited} finishEdit={finishEdit} authorChangeContent={authorChangeContent} quoteChangeContent={quoteChangeContent} />
            </div>
          );
        }

        if (content.type === ContentTypes.VIDEO) {
          return (
            <div>
              <Video pillarName={pillarName} deleteContent={deleteContent} content={content} editContent={editContent} isEditing={isEditing} contentThatIsBeingEdited={contentThatIsBeingEdited} finishEdit={finishEdit} titleChangeContent={titleChangeContent} descriptionChangeContent={descriptionChangeContent} urlChangeContent={urlChangeContent} />
           </div>
          );
        }
			});
    }

    return (
      <div>
        { (currentContentType === ContentTypes.VIDEO) && <div styleName="content-preview-section">
          <h1>Video Content</h1>
          {contentCards.filter((card) => card.props.children.type.displayName.toUpperCase() === ContentTypes.VIDEO).reverse()}
        </div> }
        { (currentContentType === ContentTypes.QUOTE) && <div styleName="content-preview-section">
          <h1>Quote Content</h1>
          {contentCards.filter((card) => card.props.children.type.displayName.toUpperCase() === ContentTypes.QUOTE).reverse()}
        </div> }
      </div>
    );
  }
}

ContentPreview.propTypes = {
  currentContentType: PropTypes.string,
  pillars: PropTypes.array,
  contents: PropTypes.array,
  deleteContent: PropTypes.func,
  editContent: PropTypes.func,
  isEditing: PropTypes.bool,
  contentThatIsBeingEdited: PropTypes.object,
  finishEdit: PropTypes.func,
  authorChangeContent: PropTypes.func,
  quoteChangeContent: PropTypes.func,
  titleChangeContent: PropTypes.func,
  descriptionChangeContent: PropTypes.func,
  urlChangeContent: PropTypes.func
};

ContentPreview = CSSModules(ContentPreview, styles);
export default ContentPreview;
