import React from 'react';
import styles from './TextEditor.css';
import CSSModules from 'react-css-modules';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

let RenderDraftJSContent = (props) => {
  const __html = stateToHTML( convertFromRaw(props.rawState) );
  return (
    <div className="editor-content" styleName="editor-content">
      <div dangerouslySetInnerHTML={ { __html } } />
    </div>
  );
};


RenderDraftJSContent.propTypes = {
  rawState: React.PropTypes.any.isRequired
};

RenderDraftJSContent = CSSModules(RenderDraftJSContent, styles);
export default RenderDraftJSContent;
