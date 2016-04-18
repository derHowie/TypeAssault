import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from '../components/App.jsx';
import Home from '../components/Home.jsx';

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
);

export default routes;
