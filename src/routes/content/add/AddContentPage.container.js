import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import _ from 'lodash';
import { createContent, deleteContent, editContent, finishEdit, formEnable, fetchContents, titleChangeContent, descriptionChangeContent, urlChangeContent, quoteChangeContent, authorChangeContent } from '../../../reducers/content/Content.actions';
import { fetchPillars } from '../../../reducers/pillar/Pillar.actions';
import Quote from '../../../components/cards/Quote.component';
import Video from '../../../components/cards/Video.component';
import ContentTypes from '../ContentTypes';
import SideMenu from './SideMenu.component';
import FormArea from './FormArea.component';

const pillarQuery = `
  {
    pillars {
      _id
      name
      isDeleted
    }
  }
`;

const contentQuery = `
  {
    contents {
      _id
      pillarId
      type
      isDeleted
      data {
        title
        description
        url
        quote
        author
        recipient
        recipientPosition
        richtext {
          blocks {
            inlineStyleRanges {
              style
              offset
              length
            }
            entityRanges {
              key
              offset
              length
            }
            key
            text
            type
            depth
          }
          entityMap {
            type
            mutability
          }
        }
      }
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
		createContent: (content) =>
			dispatch(createContent(content)),
    deleteContent: (content) =>
      dispatch(deleteContent(content)),
    editContent: (content) =>
      dispatch(editContent(content)),
    finishEdit: () =>
      dispatch(finishEdit()),
    formEnable: (isCreatingContent, currentContentType) =>
      dispatch(formEnable(isCreatingContent, currentContentType)),
    titleChangeContent: (content, _id) =>
      dispatch(titleChangeContent(content, _id)),
    descriptionChangeContent: (content, _id) =>
      dispatch(descriptionChangeContent(content, _id)),
    urlChangeContent: (content, _id) =>
      dispatch(urlChangeContent(content, _id)),
    quoteChangeContent: (content, _id) =>
      dispatch(quoteChangeContent(content, _id)),
    authorChangeContent: (content, _id) =>
      dispatch(authorChangeContent(content, _id)),
		onLoad: () => {
      dispatch(fetchPillars({ query:pillarQuery }));
      dispatch(fetchContents({ query:contentQuery }));
    }
	});

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		contents: state.content.contents,
		isEditing: state.content.isEditing,
		contentThatIsBeingEdited: state.content.contentThatIsBeingEdited,
    isCreatingContent: state.content.isCreatingContent,
    currentContentType: state.content.currentContentType
	};
};

class AddContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {

    //TODO: have one array with all contents and then filter in render
    // const listQuoteContents = [];
    // const listVideoContents = [];

    const contentViewOrder = {display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'};

    if(this.props.params.currentContentType) {
      this.props.currentContentType = this.props.params.currentContentType;
    }

    if (this.props.isCreatingContent) {
      delete contentViewOrder.flexWrap;
      delete contentViewOrder.justifyContent;
      contentViewOrder.alignItems = 'center';
      contentViewOrder.flexDirection = 'column';
    }
    let contentCards = [];

    if(this.props.contents.length > 0) {
      contentCards = this.props.contents.map((content) => {

        let pillarName = content.pillarId;
        const pillarNameIndex = _.findIndex(this.props.pillars, (pillar) => pillar._id === content.pillarId);
        if (pillarNameIndex > -1) {
          pillarName = this.props.pillars[pillarNameIndex].name;
        }
        if (content.type === ContentTypes.QUOTE) {
          return (
            <div>
              { content.type === ContentTypes.QUOTE &&
                <Quote pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} finishEdit={this.props.finishEdit}
                authorChangeContent={this.props.authorChangeContent} quoteChangeContent={this.props.quoteChangeContent} /> }
            </div>
          );
        }

        if (content.type === ContentTypes.VIDEO) {
          return (
            <div>
              { content.type === ContentTypes.VIDEO &&
                <Video pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} titleChangeContent={this.props.titleChangeContent}
                       descriptionChangeContent={this.props.descriptionChangeContent}
                       finishEdit={this.props.finishEdit}
                       urlChangeContent={this.props.urlChangeContent} /> }
            </div>
          );
        }

          // listQuoteContents.push(

  				// );

          // listVideoContents.push(

          // );
			});

    }

    return (
      <div styleName="displayFlex">

      <SideMenu currentContentType={this.props.currentContentType} formEnable={this.props.formEnable} isCreatingContent={this.props.isCreatingContent} />

      <FormArea currentContentType={this.props.currentContentType} pillars={this.props.pillars} createContent={this.props.createContent}/>

      { (this.props.currentContentType === ContentTypes.VIDEO) && <div style={{width: '25%', paddingTop: '2.1rem'}}>
        <h1>Video Content</h1>
        {contentCards.filter((card) => card.props.children.type.displayName.toUpperCase() === ContentTypes.VIDEO)}
      </div> }
      { (this.props.currentContentType === ContentTypes.QUOTE) && <div style={{width: '25%', paddingTop: '2.1rem'}}>
        <h1>Quote Content</h1>
        {contentCards}
      </div> }

    </div>
		);
	}

}

AddContentPage = CSSModules(AddContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (AddContentPage);
