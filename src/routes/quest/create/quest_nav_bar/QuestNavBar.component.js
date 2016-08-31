import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './QuestNavBar.css';
import BackArrow from '../../../../assets/images/back-arrow.svg';
import Dropdown from '../../../../components/dropdown/Dropdown.component';

class QuestNavBar extends Component {

	render() {
    const {
			quest,
      onLaunch,
      onSave
		} = this.props;

    const primaryButton = {
      name: 'Launch',
      onClick: onLaunch
    };

    const otherButtons = [
      {
        name: 'Save',
        onClick: onSave
      }
    ];

    const onBack = () => {
      console.log('back pushed');
    };


    return (
      <div className="navbar-fixed">
        <nav styleName="quest-navbar">
          <div styleName="navbar-content">
            <div styleName="left-content">
              <a
                className="waves-effect waves-default btn-flat"
                styleName="back-arrow"
                onClick={onBack}>
                <img src={BackArrow} />
              </a>
              <div styleName="quest-name-container">
                Card Deck Name:
                <div styleName="quest-name">{quest.title}</div>
              </div>
            </div>
            <div styleName="right-content">
              <div styleName="action-buttons">
                <Dropdown primaryButton={primaryButton} otherButtons={otherButtons} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
	}

}

QuestNavBar = CSSModules(QuestNavBar, styles);
export default QuestNavBar;
