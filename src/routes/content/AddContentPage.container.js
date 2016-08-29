import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import _ from 'lodash';
import { createContent, deleteContent, editContent, finishEdit, formEnable, fetchContents, titleChangeContent, descriptionChangeContent, urlChangeContent, quoteChangeContent, authorChangeContent } from '../../reducers/content/Content.actions';
import VideoForm from './video_form/VideoForm.component';
import QuoteForm from './quote_form/QuoteForm.component';
import { fetchPillars } from '../../reducers/pillar/Pillar.actions';
import Quote from '../../components/cards/Quote.component';
import Video from '../../components/cards/Video.component';
import TextEditor from '../../components/text_editor/TextEditor.component';
import ContentTypes from './ContentTypes';

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

  constructor(props) {
    super(props);

    this.state = {
      rawState: null
    };
  }

	componentDidMount() {
		this.props.onLoad();
	}

	onContentSubmit = (values, dispatch) => {
    values.type = this.props.currentContentType;
		dispatch( createContent(values) );
	}

  onRichtextSubmit = () => {
    const richtextContent = {
      type: 'richtext',
      pillarId: 'noPillar',
      data: {
        richtext: {...this.state.rawState}
      }
    };
    this.props.createContent(richtextContent);
  }

  onChange = (rawState) => {
		this.setState({rawState});
	};

	render() {

    //TODO: have one array with all contents and then filter in render
    const listQuoteContents = [];
    const listVideoContents = [];

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

    if(this.props.contents.length > 0) {
      this.props.contents.forEach((content) => {

        let pillarName = content.pillarId;
        const pillarNameIndex = _.findIndex(this.props.pillars, (pillar) => pillar._id === content.pillarId);
        if (pillarNameIndex > -1) {
          pillarName = this.props.pillars[pillarNameIndex].name;
        }

        if(!content.isDeleted) {
          listQuoteContents.push(
              <div>
                { content.type === ContentTypes.QUOTE &&
                  <Quote pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} finishEdit={this.props.finishEdit}
                  authorChangeContent={this.props.authorChangeContent} quoteChangeContent={this.props.quoteChangeContent} /> }
              </div>
  				);

          listVideoContents.push(
              <div>
                { content.type === ContentTypes.VIDEO &&
                  <Video pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} titleChangeContent={this.props.titleChangeContent}
                         descriptionChangeContent={this.props.descriptionChangeContent}
                         finishEdit={this.props.finishEdit}
                         urlChangeContent={this.props.urlChangeContent} /> }
              </div>
          );
        }
			});

    }

    let submitBtnClassName = 'btn-floating btn-large waves-effect waves-light green';
    if(!this.state.rawState) {
      submitBtnClassName = 'btn-floating btn-large disabled';
    }

		return (
      <div style={{display: 'flex'}}>

      <div style={{backgroundColor: 'rgba(117, 117, 117, 0.04)', height: '100em', width: '15%'}}>
        <div>
          <h1 style={{padding: '2.1rem 0 1.68rem 15px', margin: 'auto'}}>Select Content Type</h1>
        </div>
          {
            Object.keys(ContentTypes.properties).map( type => {
              const isActive = (type === this.props.currentContentType);
              const { value, name, description } = ContentTypes.properties[type];

              return (
                <div key={value} style={isActive ? {padding: '15px 15px 15px 15px', backgroundColor: 'white', borderBottom: 'solid rgba(117, 117, 117, 0.06) 1px'} : {padding: '15px 15px 15px 15px'}} onClick={this.props.formEnable.bind(this, this.props.isCreatingContent, value)}>
                  <h5 style={{marginBottom: '2px'}}>{name}</h5>
                  <p style={{marginTop: '0px'}}>{description}</p>
                </div>
              );
            })
          }
      </div>

      <div style={{width: '60%', paddingTop: '2.1rem'}}>
        <div style={{margin: '0px 10% 0px 10%'}}>
          { (this.props.currentContentType === ContentTypes.VIDEO) && <VideoForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} type={this.props.currentContentType} /> }
          { (this.props.currentContentType === ContentTypes.QUOTE) && <QuoteForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} type={this.props.currentContentType} /> }
          { (this.props.currentContentType === ContentTypes.RICHTEXT) &&
          <div>
            <h1>Write an Article</h1>
            <TextEditor onAutosave={ (rawContent) => this.onChange(rawContent) } />
            { this.state.rawState && <h1>Preview</h1> }
            { this.state.rawState && <TextEditor readOnly={true} startingEditorState={this.state.rawState} /> }
            <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
              <button className={submitBtnClassName} onClick={this.onRichtextSubmit}>
                <i className="large material-icons">check</i>
              </button>
            </div>
          </div> }
        </div>
      </div>

      { (this.props.currentContentType === ContentTypes.VIDEO && !_.isEmpty(listVideoContents)) && <div style={{width: '25%', paddingTop: '2.1rem'}}>
        <h1>Video Content</h1>
        {listVideoContents.reverse()}
      </div> }
      { (this.props.currentContentType === ContentTypes.QUOTE && !_.isEmpty(listQuoteContents)) && <div style={{width: '25%', paddingTop: '2.1rem'}}>
        <h1>Quote Content</h1>
        {listQuoteContents.reverse()}
      </div> }

    </div>
		);
	}

}

AddContentPage = CSSModules(AddContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (AddContentPage);
