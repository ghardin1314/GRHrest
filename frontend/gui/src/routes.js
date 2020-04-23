import React from "react";
import { Route } from "react-router-dom";

import Projects from "./containers/Projects"
import Autoscrape from "./containers/Autoscrape"

const BaseRouter = () => (
    <div>
      <Route exact path="/Projects/" component={Projects} />
      <Route exact path="/Projects/autoscrape/" component={Autoscrape} />
    </div>
  );
  
  export default BaseRouter;