//flow

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { Landing } from "./react";

let RouteContainer = ({ location, user }) => {
   return (
      <section className="route-section">
         <Switch location={location}>
            <Route exact path="/" component={Landing} />
         </Switch>
      </section>
   );
};

RouteContainer = withRouter(RouteContainer);
RouteContainer = withTranslation()(RouteContainer);

class Routes extends Component {
    render() {
       const { user } = this.props
 
       return (
          <Router>
             <RouteContainer user={user} />
          </Router>
       );
    }
 }
 
 export default Routes;
 