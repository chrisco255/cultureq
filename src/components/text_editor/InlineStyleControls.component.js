import React from 'react';
import StyleButton from './StyleButton.component';
import styles from './TextEditor.css';
import CSSModules from 'react-css-modules';

let InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {props.inlineStyles.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

InlineStyleControls = CSSModules(InlineStyleControls, styles);
export default InlineStyleControls;
