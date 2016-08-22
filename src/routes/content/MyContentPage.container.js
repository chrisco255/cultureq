import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link } from 'react-router';
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

class MyContentPage extends Component {

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

    const activeContents = this.props.contents.filter((content) => !content.isDeleted);

		return (
      <div className="row" style={{marginTop: '40'}}>
        <div className="container" style={{width: '90%'}}>

          <div className="col s12">
            <a className="waves-effect waves-light btn accent-background" style={{padding: '0 20px 0 20px', textTransform: 'capitalize'}}><i className="material-icons left" style={{marginRight: '10px'}}>add</i><Link className="white-text" to="addcontent">Add Content</Link></a>
            <div className="row">
              <div className="input-field col s4">
                <i className="material-icons left" style={{position: 'absolute', bottom: '26px'}}>search</i>
                <input id="search" placeholder="Search" type="search" className="validate" style={{paddingLeft: '35px'}} />
              </div>
            </div>
          </div>

          <div className="col s9">
            <div style={{display: 'flex'}}>
              <h1>My Content</h1>
              <p className="divider-color" style={{display: 'flex', alignItems: 'center', fontSize: '13px', paddingTop: '6px', margin: '2.1rem 0 1.68rem 8px'}}>({activeContents.length})</p>
            </div>
            <div style={{display: 'flex', borderBottom: 'dashed .5px #bdbdbd', justifyContent: 'space-between'}}>

              <div style={{display: 'flex'}}>
                {/*Icon symbol according to type of content*/}
                <div style={{marginRight: '15px', color: '#757575'}}>
                  <i className="material-icons">format_quote</i>
                </div>
                <div style={{width: '375px', marginRight: '50px'}}>
                  {/*Quote or Video Title*/}
                  <div>
                    <div style={{whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '18px', textOverflow: 'ellipsis'}}>Take care of our peoples families, and they will take care of yours.</div>
                  </div>

                  {/*Tags*/}
                  <div>
                    <p style={{color: '#757575'}}><em>No tags, add some</em></p>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', paddingBottom: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 50px 0 50px', color: '#757575'}}>
                  <p style={{margin: '0px'}}>Scott Scherr</p>
                  <p style={{marginTop: '0px'}}>Quote</p>
                </div>

                <div style={{display: 'flex', alignItems: 'center', margin: '0 50px 0 50px', color: '#757575'}}>
                  <p style={{marginTop: '0px'}}>56 min ago</p>
                </div>
              </div>


            </div>
          </div>
          <div className="col s3">
            <h1 style={{fontSize: '18px !important'}}>Featured Quests</h1>
          </div>

        </div>
      </div>
		);
	}

}

MyContentPage = CSSModules(MyContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (MyContentPage);
