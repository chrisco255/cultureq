import React from 'react';
import StyleButton from './StyleButton.component';
import styles from './TextEditor.css';
import CSSModules from 'react-css-modules';

let BlockStyleControls = (props) => {
  const { editorState, onToggle } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      {props.blockTypes.map( (type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

BlockStyleControls = CSSModules(BlockStyleControls, styles);
export default BlockStyleControls;
