import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class TimeFormat extends Component {

  render() {
    const { seconds } = this.props;
    const readable = moment.duration(seconds, 'seconds').humanize();
    return (
      <span>{readable}</span>
    );
  }
}

TimeFormat.propTypes = {
  seconds: PropTypes.number
};

export default TimeFormat;
