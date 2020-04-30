import React from "react"

import { useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";


const useStyles = makeStyles((theme) => ({

    stepper: {
      background: "white",
      position: "sticky",
      top: 40,
      bottom: 20,
      paddingTop: "50px",
      paddingBottom: "40px",
      zIndex: 5,
    },
    
  }));

export default function AutoStepper () {

    const classes = useStyles();
    const activeStep = useSelector((state) => state.activeStep);

    const steps = ["Explination", "API", "Github", "Feedback & Connect"];

    return(
        <Hidden mdDown>
        <Grid item xs={2}>
          <Stepper
            id="stepper"
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
    )
}