import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/AutoActions";
import { DynamicIFrame } from "../DynamicIframe";

import AutoStepper from "./AutoStepper";
import AutoApiSection from "./AutoApiSection";

import { MathFieldComponent } from "react-mathlive";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

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
  equation: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.55rem",
    },
  },
  linkGrid: {
    margin: theme.spacing(2),
  },
  linkCard: {
    display: "flex",
    padding: theme.spacing(1),
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContain: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function AutoBody() {
  const classes = useStyles();

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
  }

  return (
    <div className={classes.root}>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        {BestBuy.year.length !== 0 && (
          <Typography variant="h4" gutterBottom align="center">
            Optimal Car: {BestBuy.year} model with {BestBuy.miles} miles at $
            {BestBuy.price}
          </Typography>
        )}
      </div>
      <br />
      <Grid container spacing={2} justify="center">
        <AutoStepper />
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
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
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
            this was a lot (A LOT!) of data. Somewhere in the neighborhood of {' '}
            <b>730544</b> lisitings (Last scraped 4/15/2020). When the script finally finished without any
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
            changing the least, i.e. where the acceleration of price droping is
            the lowest.
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            To do this I needed to get reaquainted with my (not so) good friend
            linear algebra. Since I needed to find the second derivative of the
            price, I knew I would need a cubic surface. This meant solving for
            the following constants using least squares:
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            className={classes.equation}
          >
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="min\biggm{|}\begin{bmatrix} z \end{bmatrix} - \begin{bmatrix*} 1 & x & y & x^2 & y^2 & xy & x^2y & xy^2 & x^3 & y^3 \end{bmatrix*}\begin{bmatrix} a_1 \\ a_2 \\ a_3 \\a_4 \\a_5 \\a_6 \\a_7 \\a_8 \\a_9 \\a_{10} \end{bmatrix}\biggm{|}"
            />
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="x = year, \enspace y = miles, \enspace z = price, \enspace a_i=const"
            />
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Now I could find the best fit price at any year and milage using:
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            className={classes.equation}
          >
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="Price = a_1 + a_2x + a_3y + a_4x^2 + a_5y^2 + a_6xy + a_7x^2y + a_8xy^2 + a_9x^3 + a_{10}y^3"
            />
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            which I evaluated for a 100x100 grid over the domain of min and max
            observed year and miles, resulting in the surface you see above.
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Next up, curvature. Since I now had a matrix of prices it was easy
            to take the discrete gradients in x, y, and xy. The{" "}
            <Link href="https://en.wikipedia.org/wiki/Mean_curvature">
              mean curvature
            </Link>
            , elegantly{" "}
            <Link href="https://stackoverflow.com/a/15509751/13172332">
              laid out here
            </Link>
            , can then be calculated at all points by:
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            className={classes.equation}
          >
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="H = \frac
              {-[(\nabla Z_x^2+1) \nabla^2 Z_{yy} -2\nabla Z_x \nabla Z_y \nabla^2 Z_{xy} + (\nabla Z_y^2+1) \nabla^2 Z_{xx}]}
                {2(\nabla Z_x^2+\nabla Z_y^2+1)}"
            />
            <MathFieldComponent
              mathFieldConfig={{ readOnly: true }}
              latex="Z = 100 \times 100 \enspace matrix \enspace of \enspace price"
            />
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            then just find the minimum point in this matrix and, <b>Boom!</b>,
            you have the point at which the rate of change depreciation is at
            its lowest.
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            But Wait, There's More!
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            At this point, I thought I was done. Washed my hands of and off to
            the next project. But then, in the shower (where all good revlations
            come) I thought,
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            display="block"
          >
            <b>
              What if the theoretical optimal point is doesn't physically
              exsist?
            </b>
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            Sounded much more profound in my head...
            <br />
            <br />
            Anyway this sent me down a rabbit hole of{" "}
            <Link href="https://en.wikipedia.org/wiki/Convex_hull">
              convex hulls
            </Link>
            , or finding the smallest envelope that covers the data set. Luckily
            for me scipy has a library for that, so it took one line of code to
            find the verticies of the year-miles convex hull. What has a little
            more challenging was testing whether or not my minimum curvature
            point was inside this envelope or not. I ended up looping through
            the verticies clockwise and finding the cross product of the vector
            to the optimal point and the vector to the next vertex. If this
            cross product was positive for all verticies, the point was inside
            the envelope. Lastly I looped through the minimum curvature points
            until I found one inside my envelope. DONE!
          </Typography>
          <Grid container justify="center">
            <img
              style={{
                alt: "convexHull",
                width: 300,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/ConvexHull.svg/1200px-ConvexHull.svg.png"
            />
          </Grid>
          <br />
          <br />
          <AutoApiSection />
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
          <Grid container className={classes.cardContain}>
            <Grid item xs={12} md={6} lg={3} className={classes.linkGrid}>
              <Link href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/populate_car_types.py">
                <Paper className={classes.linkCard}>
                  <Typography variant="h6" align="center">
                    Getting make, model, and trim data
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className={classes.linkGrid}>
              <Link href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/pull_car_data.py">
                <Paper className={classes.linkCard}>
                  <Typography variant="h6" align="center">
                    Getting data for every listing
                  </Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className={classes.linkGrid}>
              <Link href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/api/process_results.py">
                <Paper className={classes.linkCard}>
                  <Typography variant="h6" align="center">
                    Data Analyzing
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          </Grid>
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
          <div style={{ height: "500px" }}></div>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={2}></Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
