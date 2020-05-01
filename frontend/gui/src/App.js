import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";

import { createMuiTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import CustomLayout from "./containers/Layout";
import LoadingBackdrop from "./components/LoadingBackdrop";

// '#ADDCCA'

let theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#2C3D63'
    },
    secondary: {
      main: '#ff6f5e'
    },
    background: {
      default: '#f7f8f3',
      paper: '#ADDCCA',
    },
  },
})

theme = responsiveFontSizes(theme);

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <CustomLayout>
              <BaseRouter />
            </CustomLayout>
            <LoadingBackdrop />
          </ThemeProvider>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(App);
