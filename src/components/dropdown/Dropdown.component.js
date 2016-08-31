import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Dropdown.component.css';
import uuid from 'uuid';

class Dropdown extends Component {

  constructor() {
    super();
    this.dropdownId = uuid.v4();
  }

  componentDidMount() {
    const dropdown = $(`#${this.dropdownId}`);
    $(`#main-button-${this.dropdownId}`).click((event) => {
      const target = $(event.target);
      const isTrigger = target.attr('id') === `trigger-${this.dropdownId}`;
      if (!isTrigger) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.props.primaryButton.onClick(event);
      }
    });
    dropdown.dropdown(this.props.options);
  }

  render() {
    const allButtonData = this.props.otherButtons;
    if (this.props.duplicatePrimary) {
      allButtonData.splice(0, 0, this.props.primaryButton);
    }
    const dropdownButtons = allButtonData.map((buttonData, index) => {
      const key = `button-${index}`;
      const button = (
        <li key={key} styleName="drop-button"><a onClick={buttonData.onClick}>{buttonData.name}</a></li>
      );
      return button;
    });
    //insert dividers every other button
    for (let i = dropdownButtons.length - 1; i > 0; i--) {
      const key = `divider-${i}`;
      const divider = <li className="divider" key={key}></li>;
      dropdownButtons.splice(i, 0, divider);
    }
    console.log('buttons - ', dropdownButtons);
    return (
      <div className="dropdown">
        <div id={this.dropdownId} data-activates={`content-${this.dropdownId}`} styleName="dropdown-container">
          <a id={`main-button-${this.dropdownId}`} className="btn waves-effect waves-default" href="#" styleName="main-button">
            <span styleName="main-button-text">{this.props.primaryButton.name}</span>
            <span id={`trigger-${this.dropdownId}`} styleName="trigger">&#9660;</span>
          </a>
        </div>
        <ul id={`content-${this.dropdownId}`} className="dropdown-content">
          {dropdownButtons}
        </ul>
      </div>
    );
  }
}

const buttonType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}).isRequired;

Dropdown.propTypes = {
  primaryButton: buttonType,
  otherButtons: PropTypes.arrayOf(buttonType).isRequired,
  options: PropTypes.object,
  duplicatePrimary: PropTypes.bool
};

Dropdown.defaultProps = {
  options: {},
  duplicatePrimary: true
};

Dropdown = CSSModules(Dropdown, styles);
export default Dropdown;
