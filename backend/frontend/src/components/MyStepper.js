import React from "react";

import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const styles = (theme) => ({
  stepper: {
    background: theme.palette.background.default,
    position: "sticky",
    top: 40,
    bottom: 20,
    paddingTop: "50px",
    paddingBottom: "40px",
    zIndex: 5,
  },
  root: {
    "&$active": {
      color: theme.palette.secondary.main,
    },
    "&$completed": {
      color: "red",
    },
  },
  active: {},
  completed: {},
});


function MyStepper(props) {

  const activeStep = useSelector((state) => state.activeStep);

  const steps = ["Explanation", "API", "Github", "Feedback & Connect"];

  return (
    <Hidden mdDown>
      <Grid item xs={2}>
        <Stepper
          id="stepper"
          activeStep={activeStep}
          orientation="vertical"
          classes={{ root: props.classes.stepper }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                completed={false}
                StepIconProps={{
                  classes: {
                    root: props.classes.root,
                    active: props.classes.active,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Hidden>
  );
}

export default withStyles(styles)(MyStepper);
