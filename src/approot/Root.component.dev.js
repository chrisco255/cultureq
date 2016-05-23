import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes/index';
import { Router } from 'react-router';
import DevTools from './DevTools.component.js';

export default class Root extends Component {
  render = () =>  {
    const {store, history } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
	        { !window.devToolsExtension ? <DevTools /> : null }
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
