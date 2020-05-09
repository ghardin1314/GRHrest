import React, { useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions/AutoActions";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import Feedback from "../Feedback";
import MyStepper from "../MyStepper";
import CftcApiSection from "./CftcApiSection"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function CftcBody() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  useEffect(() => {
    updateSelection("activeStep", 0);
    // eslint-disable-next-line
  }, []);

  function backStep(isVisible, step) {
    if (!isVisible) {
      updateSelection("activeStep", step - 1);
    }
  }

  function setStep(isVisible, step) {
    if (isVisible) {
      updateSelection("activeStep", step);
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <MyStepper />
        <ThemeProvider
          theme={(theme) =>
            createMuiTheme({
              ...theme,
              overrides: {
                MuiTypography: {
                  root: {
                    marginTop: 24,
                    marginBottom: 24,
                  },
                },
              },
            })
          }
        >
          <Grid item xs={10} md={8} justify="center">
            <VisibilitySensor
              offset={{ top: 200 }}
              onChange={(isVisible) => setStep(isVisible, 0)}
            >
              <Typography variant="h4" gutterBottom>
                Explanation:
              </Typography>
            </VisibilitySensor>
            <Typography variant="h6" gutterBottom align="left">
              Tech Stack
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              <ul>
                <li>Python</li>
                <ul>
                  <li>Requests</li>
                  <li>BeautifulSoup</li>
                  <li>Pyrebase</li>
                  <li>Django Rest Framework (Backend Rest API)</li>
                </ul>
                <li>Firebase</li>
                <ul>
                  <li>Firestore</li>
                </ul>
              </ul>
            </Typography>
            <CftcApiSection/>
            <VisibilitySensor
              offset={{ top: 200, bottom: 200 }}
              onChange={(isVisible) => setStep(isVisible, 3)}
            >
              <VisibilitySensor
                offset={{ bottom: 200 }}
                partialVisibility="bottom"
                onChange={(isVisible) => backStep(isVisible, 3)}
              >
                <Typography variant="h4" gutterBottom>
                  Feedback & Connect
                </Typography>
              </VisibilitySensor>
            </VisibilitySensor>
            <Feedback />
            <div style={{ height: "300px" }}></div>
          </Grid>
        </ThemeProvider>
        <Hidden mdDown>
          <Grid item xs={2}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
