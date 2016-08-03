import React, { Component } from 'react';
import TextEditor from '../../components/text_editor/TextEditor.component';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

function createButtons(contentState) {
	return (
		<div>
			<button styleName="style-button" className="btn waves-effect waves-light green" type="button" onClick={ () => { console.log(stateToHTML(convertFromRaw(contentState))); }}>HTML</button>
			<button styleName="style-button" className="btn waves-effect waves-light green" type="button" onClick={ () => { console.log(contentState); }}>RAW</button>
		</div>
	);
}

class TextEditorPage extends Component {
	render() {
		return (
			<div className="container">
				<TextEditor createButtons={createButtons} onSave={ (rawContent) => { console.log('Save'); } } />
			</div>
		);
	}
}

export default TextEditorPage;
