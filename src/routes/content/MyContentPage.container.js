import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchContents, setFilteredContents } from '../../reducers/content/Content.actions';
import ContentTypes from './ContentTypes';

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
    setFilteredContents: (filteredContents) =>
      dispatch(setFilteredContents(filteredContents)),
		onLoad: () => {
      dispatch(fetchContents({ query:contentQuery }));
    }
	});

const mapStateToProps = (state) => {
	return {
		contents: state.content.contents,
		isEditing: state.content.isEditing,
		contentThatIsBeingEdited: state.content.contentThatIsBeingEdited,
    isCreatingContent: state.content.isCreatingContent,
    currentContentType: state.content.currentContentType,
    filteredContents: state.content.filteredContents
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

  filterBy = (type) => {
    this.props.setFilteredContents(this.props.contents.filter((content) => content.type === type));
  };

	render() {

    $('.dropdown-button').dropdown({
       inDuration: 300,
       outDuration: 225,
       constrain_width: false,
       hover: false,
       gutter: 0,
       belowOrigin: false
     }
    );

    const styles = {
      displayFlex: {
        display: 'flex'
      }
    };

    let activeContents;

    if(!_.isEmpty(this.props.filteredContents)) {
      activeContents = this.props.filteredContents.filter((content) => !content.isDeleted);
    } else {
      activeContents = this.props.contents.filter((content) => !content.isDeleted);
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
      let itemStyle = {display: 'flex', borderBottom: 'dashed .5px #bdbdbd', justifyContent: 'space-between', marginTop: '20px'};
      if (index === activeContents.length - 1) {
        delete itemStyle.marginTop;
      }
      return (
        <div key={content._id} style={itemStyle}>
          <div style={styles.displayFlex}>
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
      <div className="row" style={{marginTop: '40px'}}>
        <div className="container" style={{width: '90%'}}>

          <div className="col s12">
            <Link className="white-text waves-effect waves-light btn accent-background" style={{padding: '0 20px 0 20px', textTransform: 'capitalize'}} to="addcontent"><i className="material-icons left" style={{marginRight: '10px'}}>add</i>Add Content</Link>
            <div className="row">
              <div className="input-field col s4">
                <i className="material-icons left" style={{position: 'absolute', bottom: '26px'}}>search</i>
                <input id="search" placeholder="Search" type="search" className="validate" style={{paddingLeft: '35px'}} />
              </div>
            </div>
          </div>

          <div>
          <div className="col s8" style={{marginRight: '95px'}}>
            <div style={styles.displayFlex}>
              <h1 style={{margin: '2.1rem 0px 0px 0px'}}>My Content</h1>
              <p className="divider-color" style={{display: 'flex', alignItems: 'center', fontSize: '13px', paddingTop: '6px', margin: '2.1rem 0px 0px 8px'}}>({this.props.contents.length})</p>
            </div>
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
            {/*List Items*/}
            {(_.isEmpty(contentItems)) ? <div>You have no content. <Link to="addcontent">Create content!</Link></div> : contentItems.reverse()}
          </div>
          <div className="col s3" style={{marginTop: '25px'}}>
            <h2 style={{fontWeight: 'bold', fontSize: '18px', margin: '2.1rem 0 0 0'}}>Featured Quests</h2>
            <div className="card grey lighten-2" style={{boxShadow: 'none'}}>
              <div className="card-content black-text" style={{padding: '25px'}}>
                <p className="accent-text" style={{textTransform: 'uppercase', fontSize: '18px', letterSpacing: '.5px', lineHeight: '20px'}}>people first</p>
                <span className="card-title" style={{fontSize: '20px'}}>Embrace Community</span>
                <p>Work in progress, loren ipsum doler et situm work in progress, loren ipsum doler et situm.</p>
              </div>
            </div>
          </div>
          </div>

        </div>
      </div>
		);
	}

}

MyContentPage = CSSModules(MyContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (MyContentPage);
