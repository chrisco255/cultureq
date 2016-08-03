import React, { Component } from 'react';
import styles from './TextEditor.css';
import CSSModules from 'react-css-modules';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw
} from 'draft-js';
import _ from 'lodash';
import InlineStyleControls from './InlineStyleControls.component';
import BlockStyleControls from './BlockStyleControls.component';

const BLOCK_TYPES = [
  {label: 'title', style: 'header-two'},
  {label: 'text_format', style: 'header-four'},
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
      editorState: this.props.editorState || EditorState.createEmpty(),
    };
    this.debouncedSave = null;
  }


  focus = () => this.refs.editor.focus();

  onSave = (editorState) => {
    if(this.props.onSave) {
      if(!this.debouncedSave) { // Check this to only created the debounced function once.
        this.debouncedSave = _.debounce( (editorState) => {
          this.props.onSave(convertToRaw(editorState.getCurrentContent()));
        }, 2 * 1000);
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

    return (
      <div className="editor-container">
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
          {this.props.createButtons( convertToRaw(editorState.getCurrentContent()) )}
        </div>
        <div className="editor" styleName="editor" onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Text Goes Here 😀 "
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  createButtons: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func,
  editorState: React.PropTypes.any
};

TextEditor = CSSModules(TextEditor, styles);
export default TextEditor;
