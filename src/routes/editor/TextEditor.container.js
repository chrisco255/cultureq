import React, { Component } from 'react';
import TextEditor from '../../components/text_editor/TextEditor.component';
import RenderDraftJsContent from '../../components/text_editor/RenderDraftJSContent.component';
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
	constructor(props) {
		super(props);

		this.state = {
			rawState: null
		};
	}

	onChange = (rawState) => this.setState({rawState});

	render() {
		return (
			<div className="container">
				<TextEditor createButtons={createButtons} onSave={ (rawContent) => this.onChange(rawContent) } />
				<br />
				<br />
				<br />
				<br />
				{ this.state.rawState && <RenderDraftJsContent rawState={this.state.rawState} /> }
			</div>
		);
	}
}

export default TextEditorPage;
