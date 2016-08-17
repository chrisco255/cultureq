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
      }
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
		createContent: (content) =>
			dispatch(createContent(content)),
    deleteContent: (content) =>
      dispatch(deleteContent(content)),
    editContent: (content, index) =>
      dispatch(editContent(content, index)),
    finishEdit: () =>
      dispatch(finishEdit()),
    formEnable: (isCreatingContent, currentContentType) =>
      dispatch(formEnable(isCreatingContent, currentContentType)),
    titleChangeContent: (content, index) =>
      dispatch(titleChangeContent(content, index)),
    descriptionChangeContent: (content, index) =>
      dispatch(descriptionChangeContent(content, index)),
    urlChangeContent: (content, index) =>
      dispatch(urlChangeContent(content, index)),
    quoteChangeContent: (content, index) =>
      dispatch(quoteChangeContent(content, index)),
    authorChangeContent: (content, index) =>
      dispatch(authorChangeContent(content, index)),
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
		contentThatIsBeingEditedIndex: state.content.contentThatIsBeingEditedIndex,
    isCreatingContent: state.content.isCreatingContent,
    currentContentType: state.content.currentContentType
	};
};

class ContentPage extends Component {

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
    console.log(values);
		dispatch( createContent(values) );
	}

  onRichtextSubmit = (dispatch) => {
    const richtextContent = {
      type: 'richtext',
      pillarId: 'noPillar'
    };
    richtextContent.data = this.state.rawState;
    console.log(this.state.rawState);
    console.log(richtextContent);
    dispatch( createContent(richtextContent) );
  }

  onChange = (rawState) => {
		console.log(rawState);
		this.setState({rawState});
	};

	render() {

    let listContents;

    const types = [{
      value: 'richtext',
      name: 'Article',
      description: 'A text editor where you can write in any format you want.'
    }, {
      value: 'video',
      name: 'Video',
      description: 'Displays a video with a title and description.'
    }, {
      value: 'quote',
      name: 'Quote',
      description: 'Displays a quote with the accredited author.'
    }];

    const activeContents = this.props.contents.filter((content) => !content.isDeleted);
    const contentViewOrder = {display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'};

    if (this.props.isCreatingContent) {
      delete contentViewOrder.flexWrap;
      delete contentViewOrder.justifyContent;
      contentViewOrder.alignItems = 'center';
      contentViewOrder.flexDirection = 'column';
    }

    if(activeContents.length > 0) {
      listContents = this.props.contents.map((content, index) => {

        let pillarName = content.pillarId;
        const pillarNameIndex = _.findIndex(this.props.pillars, (pillar) => pillar._id === content.pillarId);
        if (pillarNameIndex > -1) {
          pillarName = this.props.pillars[pillarNameIndex].name;
        }

        if(!content.isDeleted) {
          return (
              <div>
                { content.type === 'QUOTE' &&
                  <Quote key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} contentThatIsBeingEditedIndex={this.props.contentThatIsBeingEditedIndex} finishEdit={this.props.finishEdit}
                  authorChangeContent={this.props.authorChangeContent} quoteChangeContent={this.props.quoteChangeContent} /> }
                { content.type === 'VIDEO' &&
                  <Video key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} contentThatIsBeingEditedIndex={this.props.contentThatIsBeingEditedIndex} titleChangeContent={this.props.titleChangeContent}
                         descriptionChangeContent={this.props.descriptionChangeContent}
                         finishEdit={this.props.finishEdit}
                         urlChangeContent={this.props.urlChangeContent} /> }
                {/*{ content.type === 'LUNCH' &&
                  <Action key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} /> }*/}
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

      <div style={{backgroundColor: 'rgba(117, 117, 117, 0.04)', height: '100em', width: '23%'}}>
        <div>
          <h1 style={{padding: '2.1rem 0 1.68rem 15px', margin: 'auto'}}>Select Content Type</h1>
        </div>
        { types.map( type => {
          const isActive = (type.value === this.props.currentContentType);
          return(
            <div key={type.value} style={isActive ? {padding: '15px 15px 15px 15px', backgroundColor: 'white', borderBottom: 'solid rgba(117, 117, 117, 0.06) 1px'} : {padding: '15px 15px 15px 15px'}} onClick={this.props.formEnable.bind(this, this.props.isCreatingContent, type.value)}>
              <h5 style={{marginBottom: '2px'}}>{type.name}</h5>
              <p style={{marginTop: '0px'}}>{type.description}</p>
            </div>
          ); }) }
      </div>

      <div style={{width: '77%', paddingTop: '2.1rem'}}>
        <div className="container">
          { (this.props.currentContentType === 'video') && <VideoForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} type={this.props.currentContentType} /> }
          { (this.props.currentContentType === 'quote') && <QuoteForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} type={this.props.currentContentType} /> }
          { (this.props.currentContentType === 'richtext') &&
          <div>
            <h1>Write an Article</h1>
            <TextEditor onAutosave={ (rawContent) => this.onChange(rawContent) } />
            <h1>Preview</h1>
            { this.state.rawState && <TextEditor readOnly={true} startingEditorState={this.state.rawState} /> }
          </div> }
          { (this.props.currentContentType === 'richtext') && <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
            <a className={submitBtnClassName} onClick={this.onRichtextSubmit}>
              <i className="large material-icons">check</i>
            </a>
          </div> }
        </div>
      </div>

    </div>
		);
	}

}

ContentPage = CSSModules(ContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (ContentPage);
