// flow

import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, withRouter,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import {
  Landing, Rooms, Story, NotFound, Login, Register, Stories,
} from './react';

let RouteContainer = ({ location }) => (
  <section className="route-section">
    <Switch location={location}>
      <Route exact path="/" component={Landing} />
      <Route exact path="/rooms" component={Rooms} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/stories" component={Stories} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/awesome-story" component={Story} />
      <Route component={NotFound} />
    </Switch>
  </section>
);

RouteContainer = withRouter(RouteContainer);
RouteContainer = withTranslation()(RouteContainer);

const Routes = ({ user }) => (
  <Router>
    <RouteContainer user={user} />
  </Router>
);

export default Routes;
