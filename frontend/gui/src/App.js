import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";


import CustomLayout from "./containers/Layout";

function App() {
  return (
    <div>
      <Router>
        <CustomLayout>
            <BaseRouter />
        </CustomLayout>
      </Router>
    </div>
  );
}

export default App;
