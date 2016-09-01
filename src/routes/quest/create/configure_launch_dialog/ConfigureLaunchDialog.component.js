import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ConfigureLaunchDialog.css';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

class ConfigureLaunchDialog extends Component {

	render() {
		const datePickerStyless = {
			width: '100%'
		};

		const toggleStyles = {
			root: {
				display: 'inline-block',
				width: 'auto'
			},
			label: {
				whiteSpace: 'nowrap',
				marginRight: '25px'
			}
		};

    return (
      <div id="launch-config" className="modal">
        <div className="modal-content">
          <h4 styleName="title">Configure Launch</h4>
          <div styleName="launch-options">
          	<DatePicker hintText="Start date" textFieldStyle={datePickerStyless} container="inline" mode="landscape" />
						<DatePicker hintText="End date" textFieldStyle={datePickerStyless} container="inline" mode="landscape" />
						<div styleName="toggle-container">
							<Toggle label="High priority" style={toggleStyles.root} labelStyle={toggleStyles.label} />
							<div styleName="toggle-description">This will notify employees by email</div>
						</div>
          </div>
        </div>
        <div className="modal-footer">
					<a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
        </div>
      </div>
    );
	}
}

// ConfigureLaunchDialog.propTypes = {
//   quest: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     pillar: PropTypes.string.isRequired,
//     content: PropTypes.arrayOf(PropTypes.object).isRequired
//   }).isRequired
// };

ConfigureLaunchDialog = CSSModules(ConfigureLaunchDialog, styles);
export default ConfigureLaunchDialog;
