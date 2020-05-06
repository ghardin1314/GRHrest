import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./containers/About";
import Projects from "./containers/Projects";
import Autoscrape from "./containers/Autoscrape";
import Cftc from "./containers/Cftc";

const Page404 = ({ location }) => (
  <div>
    <h2>
      Sorry page <code>{location.pathname}</code> does not exist
    </h2>
  </div>
);

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={About} />
    <Route exact path="/Projects/" component={Projects} />
    <Route exact path="/Projects/autoscrape/" component={Autoscrape} />
    <Route exact path="/Projects/cftc/" component={Cftc} />
    <Route component={Page404} />
  </Switch>
);

export default BaseRouter;
