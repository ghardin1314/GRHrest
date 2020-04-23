import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";


import CustomLayout from "./containers/Layout";
import LoadingBackdrop from "./components/LoadingBackdrop"

class App extends React.Component {
  render(){
  return (
    <div>
      <Router>
        <CustomLayout>
            <BaseRouter />
            <LoadingBackdrop/>
        </CustomLayout>
      </Router>
    </div>
  );
}}

const mapStateToProps = state => {
  return{
    loading: state.loading
  }
}

export default connect(mapStateToProps)(App);
