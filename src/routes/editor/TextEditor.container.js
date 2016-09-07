import React, { Component } from 'react';
import TextEditor from '../../components/text_editor/TextEditor.component';

function createButtons(contentState) {
	return (
		<div>
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

	onChange = (rawState) => {
		console.log(rawState);
		this.setState({rawState});
	};

	render() {
		console.log('render');
		console.log('state', this.state);
		return (
			<div className="container">
				<TextEditor createButtons={createButtons} onAutosave={ (rawContent) => this.onChange(rawContent) } />
				<br />
				<br />
				<br />
				<br />
				{ this.state.rawState && <TextEditor className="boom" readOnly={true} startingEditorState={this.state.rawState} /> }
			</div>
		);
	}
}

export default TextEditorPage;
