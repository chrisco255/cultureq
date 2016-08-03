import React, { Component } from 'react';
import styles from './TextEditor.css';
import CSSModules from 'react-css-modules';

class StyleButton extends Component {
  onToggle = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  }

  render() {
    const className = this.props.active ?
          'btn waves-effect waves-light blue' :
          'btn waves-effect waves-light white lighten-5 black-text';
    return (
      <button className={className} styleName="style-button" onClick={this.onToggle}>
        <i className="material-icons">{this.props.label}</i>
      </button>
    );
  }
}

StyleButton = CSSModules(StyleButton, styles);
export default StyleButton;
