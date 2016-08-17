import React, { Component } from 'react';
import styles from './TextEditor.css';
import CSSModules from 'react-css-modules';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import _ from 'lodash';
import InlineStyleControls from './InlineStyleControls.component';
import BlockStyleControls from './BlockStyleControls.component';

const BLOCK_TYPES = [
  {label: 'title', style: 'header-two'},
  {label: 'subtitles', style: 'header-four'},
  {label: 'format_quote', style: 'blockquote'},
  {label: 'format_list_bulleted', style: 'unordered-list-item'},
  {label: 'format_list_numbered', style: 'ordered-list-item'},
];

const INLINE_STYLES = [
  {label: 'format_bold', style: 'BOLD'},
  {label: 'format_italic', style: 'ITALIC'},
  {label: 'format_underlined', style: 'UNDERLINE'},
];

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.debouncedSave = null;
  }


  focus = () => this.refs.editor.focus();

  onSave = (editorState) => {
    if(this.props.onAutosave) {
      if(!this.debouncedSave) { // Check this to only created the debounced function once.
        this.debouncedSave = _.debounce( (editorState) => {
          this.props.onAutosave(convertToRaw(editorState.getCurrentContent()));
        }, this.props.autosaveTimeout || 2000 );
      }

      // Only call this if onSave prop has been passed in.
      this.debouncedSave(editorState);
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState });
    this.onSave(editorState);
  }

  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  };

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  };

  render() {
    const { editorState } = this.state;
    const { readOnly, createButtons, startingEditorState } = this.props;

    const currentState = startingEditorState
                  ? EditorState.createWithContent( convertFromRaw(startingEditorState) )
                  : editorState;

    return (
      <div className="editor-container">
        { !readOnly &&
          <div styleName="flex">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
              blockTypes={BLOCK_TYPES}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
              inlineStyles={INLINE_STYLES}
            />
            { createButtons && createButtons( convertToRaw(editorState.getCurrentContent()) ) }
          </div>
        }
        <div className="editor-content" styleName="editor-content" onClick={this.focus}>
          <Editor
            editorState={currentState}
            onChange={this.onChange}
            placeholder="Text Goes Here 😀 "
            ref="editor"
            spellCheck={true}
            readOnly={readOnly}
          />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  createButtons: React.PropTypes.func,
  onAutosave: React.PropTypes.func,
  autosaveTimeout: React.PropTypes.number,
  startingEditorState: React.PropTypes.any, // Really this is a rawContentState
  readOnly: React.PropTypes.bool
};

TextEditor = CSSModules(TextEditor, styles);
export default TextEditor;
