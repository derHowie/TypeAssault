import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from '../components/App.jsx';
import Game from '../components/containers/Game.jsx';

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Game} />
    </Route>
  </Router>
);

export default routes;
