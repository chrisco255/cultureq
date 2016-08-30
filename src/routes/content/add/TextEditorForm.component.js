import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';
import TextEditor from '../../../components/text_editor/TextEditor.component';

class TextEditorForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rawState: null
    };
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

    let submitBtnClassName = 'btn-floating btn-large waves-effect waves-light green';
    if(!this.state.rawState) {
      submitBtnClassName = 'btn-floating btn-large disabled';
    }

    return (
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
      </div>
    );
  }
}

TextEditorForm.propTypes = {
  createContent: PropTypes.func
};

TextEditorForm = CSSModules(TextEditorForm, styles);
export default TextEditorForm;
