import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ConfigureLaunchDialog.css';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';

class ConfigureLaunchDialog extends Component {

	constructor() {
		super();
		this.state = {
			startDate: null,
			endDate: null,
			highPriority: true,
			hoverClose: false
		};
	}

	resetState = () => {
		this.setState({
			startDate: null,
			endDate: null,
			highPriority: true,
			hoverClose: false
		});
	}

	onDateChange = (type, event, date) => {
		if (type === 'start') {
			this.setState({startDate: date});
		} else if (type === 'end') {
			this.setState({endDate: date});
		}
	};

	onToggle = () => {
		this.setState({highPriority: !this.state.highPriority});
	}

	submitPushed = () => {
		//TODO dispatch launch options changed event with current state if valid
		this.resetState();
	};

	cancelPushed = () => {
		this.resetState();
	}

	closeHovered = (state) => {
		if (state === 'enter') {
			this.setState({hoverClose: true});
		} else if (state === 'leave') {
			this.setState({hoverClose: false});
		}
	}

	closeClicked = () => {
		this.resetState();
		$('#launch-config').closeModal();
	};

	render() {
		const datePickerStyles = {
			hint: {
				left: '35px'
			},
			textField: {
				width: '100%',
			},
			input: {
				paddingLeft: '35px',
				boxSizing: 'border-box'
			}
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


		const formatDate = (date) => {
			return moment(date).format('MM/DD/YYYY');
		};

    return (
      <div id="launch-config" className="modal" styleName="launch-config">
				<span
					className="material-icons"
					styleName="close-icon"
					onMouseEnter={this.closeHovered.bind(this, 'enter')}
					onMouseLeave={this.closeHovered.bind(this, 'leave')}
					onClick={this.closeClicked.bind(this)}>
					{this.state.hoverClose ? 'cancel' : 'close'}
				</span>
        <div className="modal-content">
          <h4 styleName="title">Configure Launch</h4>
          <div styleName="launch-options">
						<div styleName="date-picker-container">
							<i className="material-icons" styleName="date-icon">today</i>
							<DatePicker
								hintText="Start date"
								textFieldStyle={datePickerStyles.textField}
								hintStyle={datePickerStyles.hint}
								inputStyle={datePickerStyles.input}
								container="inline"
								mode="landscape"
								formatDate={formatDate}
								value={this.state.startDate}
								onChange={this.onDateChange.bind(this, 'start')} />
      			</div>
						<div styleName="date-picker-container">
							<i className="material-icons" styleName="date-icon">today</i>
							<DatePicker
								hintText="End date"
								textFieldStyle={datePickerStyles.textField}
								hintStyle={datePickerStyles.hint}
								inputStyle={datePickerStyles.input}
								container="inline"
								mode="landscape"
								formatDate={formatDate}
								value={this.state.endDate}
								onChange={this.onDateChange.bind(this, 'end')} />
      			</div>
						<div styleName="toggle-container">
							<Toggle
								label="High priority"
								style={toggleStyles.root}
								labelStyle={toggleStyles.label}
								thumbStyle={toggleStyles.thumbStyle}
								trackStyle={toggleStyles.trackStyle}
								onToggle={this.onToggle.bind(this)}
								toggled={this.state.highPriority}/>
							<div styleName="toggle-description">This will notify employees by email</div>
						</div>
          </div>
        </div>
        <div className="modal-footer" styleName="modal-footer">
					<a href="#!" className=" modal-action modal-close waves-effect waves-default btn" styleName="confirm-button" onClick={this.cancelPushed}>Confirm</a>
					<a href="#!" className=" modal-action modal-close waves-effect waves-default btn-flat" onClick={this.submitPushed}>Cancel</a>
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
