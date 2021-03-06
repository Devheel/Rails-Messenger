/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import configureStore from '../store/configure-store';
import Root from '../containers/root';
import configureChannels from '../channels/configure_channels';

const history = createHistory();
const store = configureStore(window.__INITIAL_STATE__, history);

/** Set up Action Cable channel subscriptions */
configureChannels(store.dispatch);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('app'),
  );
});
