import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app_layout/App.component';
import HomePage from './home/HomePage.container.js';
import LandingPage from './landing/LandingPage.container';
import CompanyPage from './company/CompanyPage.container.js';
import DashboardPage from './dashboard/DashboardPage.container.js';
import ProfilePage from './profile/ProfilePage.container.js';
import PillarPage from './pillar/PillarPage.container.js';
import AnalyticsPage from './analytics/AnalyticsPage.container.js';
import AddContentPage from './content/add/AddContentPage.container.js';
import MyContentPage from './content/MyContentPage.container.js';
import TextEditorPage from './editor/TextEditor.container.js';
import QuestPage from './quest/QuestPage.container';
import store from '../store/configureStore';

function IndexComponent(nextState, cb) {
	const loggedIn = store.getState().user.token;
	console.log(`LoggedIn: ${loggedIn}`);

	if(loggedIn) {
		cb(null, HomePage);
	}
	else {
		cb(null, LandingPage);
	}
}

export default (
  <Route path="/" component={App}>
	  <IndexRoute getComponent={IndexComponent} />
    <Route path="company" component={CompanyPage} />
    <Route path="analytics" component={AnalyticsPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="pillar" component={PillarPage} />
		<Route path="addcontent" component={AddContentPage} />
		<Route path="addcontent/:currentContentType" component={AddContentPage} />
    <Route path="mycontent" component={MyContentPage} />
    <Route path="editor" component={TextEditorPage} />
    <Route path="quests" component={QuestPage} />
  </Route>
);
