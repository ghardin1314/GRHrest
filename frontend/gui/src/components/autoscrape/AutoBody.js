import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/AutoActions";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepper: {
    background: "white",
    position: "-webkit-sticky",
    position: "sticky",
    top: 40,
    bottom: 20,
    paddingTop: "40px",
    paddingBottom: "40px",
    zIndex: 5,
  },
}));

export default function AutoBody() {
  const classes = useStyles();
  const steps = ["Explination", "API", "Github", "More"];
  const activeStep = useSelector((state) => state.activeStep);
  const BestBuy = useSelector((state) => state.BestBuy);

  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  const dispatch = useDispatch();

  function setStep(isVisible, step) {
    if (isVisible) {
      if (step < activeStep) {
        updateSelection("activeStep", step);
      }
    } else {
      if (step === activeStep) {
        updateSelection("activeStep", step + 1);
      }
    }
  }

  return (
    <div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        {BestBuy.year.length !== 0 && (
          <Typography variant="h3" gutterBottom align="center">
            Optimal Car: {BestBuy.year} with {BestBuy.miles} miles at $
            {BestBuy.price}
          </Typography>
        )}
      </div>
      <Grid container spacing={2}>
        <Hidden mdDown>
          <Grid item xs={2}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={classes.stepper}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel completed={false}>{label}</StepLabel>
                  <StepContent>
                    <div className={classes.actionsContainer}>
                      <div></div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={8}>
          <VisibilitySensor onChange={(isVisible) => setStep(isVisible, 0)}>
            <Typography variant="h4" gutterBottom>
              Explination:
            </Typography>
          </VisibilitySensor>
          <Typography variant="h6" gutterBottom align="left">
            Let there be data!
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            In the begining there was nothing. Then, Python said "Let there be data!", and there was
            data. Well... it wasn't quite that easy. All of the data was
            webscraped from a friendly neighboorhood car listing site (where one
            might "trade autos"). Gathering the data came in two parts; finding
            all of the makes, models, and trims with used listings available,
            and then saving the data for the inidvidual listings.
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            What are my options?
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            I first went to the advance search options page on the site to find
            all my options. My inital idea was to use splinter and just cycle
            through the drop down menu, but that wasn't the most reliable and
            took forever. So while I was messing around I found the internal API
            calls on while observing the network log on the browser console.
            After a bit of fanagling I got the format correct and could directly
            call the API myself. Doing this still took too long so I went ahead
            and added some threading to the code to speed up the process, but
            then I hit the API rate limit while pulling all the trims so I had
            to add some pauses. You win some...
          </Typography>
          <Typography variant="h6" gutterBottom align="left">

          </Typography>
          <Typography variant="body1" gutterBottom align="left">

          </Typography>
          <div style={{ height: "500px" }}></div>
          <VisibilitySensor onChange={(isVisible) => setStep(isVisible, 1)}>
            <Typography variant="h4" gutterBottom>
              API:
            </Typography>
          </VisibilitySensor>
          <Typography variant="body1" gutterBottom>
            Api Doc...
          </Typography>
          <div style={{ height: "500px" }}></div>
          <VisibilitySensor onChange={(isVisible) => setStep(isVisible, 2)}>
            <Typography variant="h4" gutterBottom>
              Github:
            </Typography>
          </VisibilitySensor>
          <Typography variant="body1" gutterBottom>
            Github Link
          </Typography>
          <div style={{ height: "500px" }}></div>
        </Grid>
      </Grid>
    </div>
  );
}
