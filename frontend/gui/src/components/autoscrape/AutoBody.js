import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/AutoActions";
import { DynamicIFrame } from "../DynamicIframe";

import {
  MakeBlockAPI,
  ModelBlockAPI,
  TrimBlockAPI,
  ResultsBlockAPI,
} from "./apiDocs";

import { MathFieldComponent } from "react-mathlive";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

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
    // position: "-webkit-sticky",
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
  const steps = ["Explination", "API", "Github", "Feedback & Connect"];
  const activeStep = useSelector((state) => state.activeStep);
  const BestBuy = useSelector((state) => state.BestBuy);

  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  const dispatch = useDispatch();

  function backStep(isVisible, step) {
    if (!isVisible) {
      console.log("off bottom");
      updateSelection("activeStep", step - 1);
    }
  }

  function setStep(isVisible, step) {
    if (isVisible) {
      updateSelection("activeStep", step);
    }

    // if (isVisible) {
    //   if (step < activeStep) {
    //     updateSelection("activeStep", step);
    //   }
    // } else {
    //   if (step === activeStep) {
    //     updateSelection("activeStep", step + 1);
    //   }
    // }
  }

  return (
    <div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        {BestBuy.year.length !== 0 && (
          <Typography variant="h4" gutterBottom align="center">
            Optimal Car: {BestBuy.year} with {BestBuy.miles} miles at $
            {BestBuy.price}
          </Typography>
        )}
      </div>
      <br />
      <Grid container spacing={2} justify="center">
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
        <Grid item xs={10} md={8} justify="center">
          <VisibilitySensor
            offset={{ top: 200, bottom: 200 }}
            onChange={(isVisible) => setStep(isVisible, 0)}
          >
            <Typography variant="h4" gutterBottom>
              Explination:
            </Typography>
          </VisibilitySensor>
          <Typography variant="h6" gutterBottom align="left">
            Let there be data!
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            In the begining there was nothing. Then, Python said "Let there be
            data!", and there was data. Well... it wasn't quite that easy. All
            of the data was webscraped from a friendly neighboorhood car listing
            site (where one might "trade autos"). Gathering the data came in two
            parts; finding all of the makes, models, and trims with used
            listings available, and then saving the data for the inidvidual
            listings.
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
            Cars! Cars! Cars!
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Next step, aquire the goods. Now that I have all the options to pick
            from, I looped through every make, model, trim combination and
            pulled the listing results. Turns out, you can only go 1000 listings
            deep into the database of the site. To get a fully representative
            data pool, I sorted the cars by distance to hopefully get an equal
            amount of older and newer cars. I also through in a splash of
            threading to speed up the process becasue I ain't got time to burn
            like that.
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Suprisingly it actually took much longer to write the results to the
            database than to scape them from the site and more suprisingly I
            never hit the API limit during this. Even with the limit of results,
            this was a lot (A LOT!) of data. Somewhere in the neighborhood of ~3
            million lisitings. When the script finally finished without any
            errors and I realized I effectively pulled all the publicly
            available data from this site I was like:
          </Typography>
          <Grid container justify="center">
            <DynamicIFrame src="https://giphy.com/embed/RLWwOuPbqObupogOLB" />
          </Grid>
          <Typography variant="h6" gutterBottom align="left">
            Crunch the Numbers...
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Now to do something with all this data. I wanted to see if there was
            an absolute optimal car to buy from a depreciation standpoint.
            Theoretically, this would be where the rate of depreciation is
            changing the least, i.e. where the acceleration of depreciation is
            the lowest. To do this I needed to get reaquainted with my (not so)
            good friend linear algebra. Since I needed to find the second
            derivative of the price, I knew I would need a cubic surface. This
            meant solving for the following constants using least squares:
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="min\biggm{|}\begin{bmatrix} z \end{bmatrix} - \begin{bmatrix*} 1 & x & y & x^2 & y^2 & xy & x^2y & xy^2 & x^3 & y^3 \end{bmatrix*}\begin{bmatrix} a_1 \\ a_2 \\ a_3 \\a_4 \\a_5 \\a_6 \\a_7 \\a_8 \\a_9 \\a_{10} \end{bmatrix}\biggm{|}"
            />
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="x = year, y = miles, z = year, a_i=const"
            />
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Now I could find the theoretical price at any year and milage using:
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="Price = a_1 + a_2x + a_3y + a_4x^2 + a_5y^2 + a_6xy + a_7x^2y + a_8xy^2 + a_9x^3 + a_{10}y^3"
            />
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            which I evaluated for a 100x100 grid over the domain of min and max
            observed year and miles, resulting in the surface you see above.
          </Typography>
          <br />
          <br />
          <VisibilitySensor
            offset={{ top: 200, bottom: 200 }}
            onChange={(isVisible) => setStep(isVisible, 1)}
          >
            <VisibilitySensor
              offset={{ bottom: 200 }}
              partialVisibility="bottom"
              onChange={(isVisible) => backStep(isVisible, 1)}
            >
              <Typography variant="h4" gutterBottom>
                API:
              </Typography>
            </VisibilitySensor>
          </VisibilitySensor>
          <Typography variant="subtitle1" gutterBottom>
            Get primary keys, name, and query value for every make. Use id if
            you only want one make.
          </Typography>
          <MakeBlockAPI />
          <Typography variant="subtitle1" gutterBottom>
            Get primary keys, name, and query value for every model. Use id if
            you only want one model. To get all models of a specific make, use
            the make primary key.
          </Typography>
          <ModelBlockAPI />
          <Typography variant="subtitle1" gutterBottom>
          Get primary keys, name, and query value for every trim. Use id if
            you only want one trim. To get all trim of a specific make or model, use
            the make or model primary key.
          </Typography>
          <TrimBlockAPI />
          <Typography variant="subtitle1" gutterBottom>
            Get results for specific make, model, or trim. 
            One primary key must be passed to get results.
          </Typography>
          <ResultsBlockAPI />
          <VisibilitySensor
            offset={{ top: 200, bottom: 200 }}
            onChange={(isVisible) => setStep(isVisible, 2)}
          >
            <VisibilitySensor
              offset={{ bottom: 200 }}
              partialVisibility="bottom"
              onChange={(isVisible) => backStep(isVisible, 2)}
            >
              <Typography variant="h4" gutterBottom>
                Github:
              </Typography>
            </VisibilitySensor>
          </VisibilitySensor>
          <Typography variant="h6">
            <Link href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/populate_car_types.py">
              Getting make, model, and trim data
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/pull_car_data.py">
              Getting data for every listing
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/api/process_results.py">
              Data Analyzing
            </Link>
          </Typography>
          <div style={{ height: "500px" }}></div>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={2}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
