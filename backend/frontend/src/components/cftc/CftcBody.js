import React, { useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useDispatch } from "react-redux";

import { CodeBlock } from "react-code-blocks";
import { MathFieldComponent } from "react-mathlive";

import * as actions from "../../store/actions/AutoActions";
import CftcEx from "../../static/images/CftcEx.PNG";

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
import Paper from "@material-ui/core/Paper";

import Feedback from "../Feedback";
import MyStepper from "../MyStepper";
import CftcApiSection from "./CftcApiSection";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  linkGrid: {
    margin: theme.spacing(2),
  },
  linkCard: {
    background: theme.palette.background.paper,
    display: "flex",
    padding: theme.spacing(1),
    height: 150,
    width: "md",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContain: {
    justifyContent: "center",
    alignItems: "center",
  },
  equation: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.55rem",
    },
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
            <Typography variant="body1" gutterBottom align="left">
              *Data is collected each Tuesday and reported each Friday. This
              table should update at 7 PM pacific time each Friday.
            </Typography>
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
            <Typography variant="h6" gutterBottom align="left">
              (Not quite) Divine Inspiration
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              This project was inspired by the team at{" "}
              <Link
                target="_blank"
                rel="noopener"
                href="https://twitter.com/Hedgeye"
              >
                Hedgeye
              </Link>
              , an investment research firm that I follow closely. A key metric
              they provide is the net position of hedge funds and other large
              speculative traders. This provides a good thermometer of sentiment
              on the market and helps spot key moments where one can bet against
              consensus at market inflection points. Because this comes from
              publicly available data, I thought it would be a quick project to
              set up my own data funnel so I didn't have to rely on them. I also
              wanted to be able to view historical data and trends for future
              back-testing.
            </Typography>
            <Typography variant="h6" gutterBottom align="left">
              Gone Data Fishing
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              This first step was to actually find where the data I wanted was.
              I strolled over to{" "}
              <Link
                target="_blank"
                rel="noopener"
                href="https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
              >
                CFTC.gov
              </Link>{" "}
              and had a look around. After a lot of digging and control-F'ing, I
              found that the different commodities and indices where reported
              under their respective exchanges like this:
            </Typography>
            <br />
            <Grid container justify="center">
              <img
                alt="CftcEx"
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                src={CftcEx}
              />
            </Grid>
            <Typography variant="body1" gutterBottom align="left">
              I made .csv file breaking down which key came from which exchange
              report and can be found in the github repository below. For each
              key, I subtracted the two boxed numbers to get the net-long
              position and stored that number along with the date of the data.
            </Typography>
            <Typography variant="h6" gutterBottom align="left">
              Automating History
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              Getting the current set of data was an easy scrape from the
              current reports page of the CFTC site, but these weren't that
              helpful without any context. To get the historical data, I used
              BeautifulSoup to strip the date format from the links on the site
              page. Originally I was going to use BeautifulSoup to just collect
              all the hefs for the report links themselves, but this took too
              long and it was much faster to just figure out the link formatting
              pattern and call the text reports directly. So I just pulled all
              the dates that reports were available and then looped through each
              exchange report I was interested in. In each report I pulled the
              relevant data for each key listed on that exchange and done! The
              only real hiccup I ran into was hitting the API limit. This was
              easily overcome with a try-except loop with a sleep function
              before trying the call again:
            </Typography>
            <br />
            <Grid item justify="center">
              <Paper>
                <CodeBlock
                  language="python"
                  showLineNumbers={false}
                  text={`
                for i in range(10):
                    try:
                        with requests.session() as s:
                            html = s.get(built_url, timeout=30)
                            break
                    except requests.exceptions.RequestException as errt:
                        print('error on {}'.format(link), errt)
                        time.sleep(30)
                        if i == 9:
                            return
                        continue
                    break
                `}
                />
              </Paper>
            </Grid>
            <Typography variant="h6" gutterBottom align="left">
              How not to Database
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              So at this point I needed somewhere to store the data and it
              just so happened that I was using Firebase for another project. I
              just wanted a quick, dirty, and free way to store the data so that
              I could access and update it from anywhere and it seemed to fit
              the bill. This turned out to be a <b>terrible</b> idea as I didn't
              put much thought into how I would be calling the data in the
              future and I learned a hard lesson about relational and
              non-relational databases. Here is the basic structure of the data:
            </Typography>
            <br />
            <Grid item justify="center">
              <Paper>
                <CodeBlock
                  language="json"
                  showLineNumbers={false}
                  text={`
                {
                    key: {
                        dateKey: {
                            Net Long: XXXX,
                            date: xxxxx
                        },
                        dateKey: {
                            Net Long: XXXX,
                            date: xxxxx
                        },
                        .
                        .
                        .
                    },
                    .
                    .
                    .
                }
                `}
                />
              </Paper>
            </Grid>
            <Typography variant="body1" gutterBottom align="left">
              This data structure means that there is no way to query across
              keys for a range of dates. I have to use a separate rate API call
              and database look up for each line of the table above, which is
              why it takes so long to populate. This was a valuable lesson
              learned the hard way that could have easily been avoided with some
              forethought and more understanding on the importance of data
              structuring. At some point I will probably transfer the data to a
              relational database, but this would involve updating the automated
              scraping system I have set up and I just can't be bothered to
              do that right now. If it ain't broke don't fix it right?
              (Something, something, technical debt...)
            </Typography>
            <Typography variant="h6" gutterBottom align="left">
              Statistics 101
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              Most of the statistics in the table above (min, max, average) are
              pretty straight forward. The only one I had to reacquainted with
              was Z-score. This is just the number of standard deviations that
              the data is away from the 1 or 3 year mean:
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              align="center"
              className={classes.equation}
            >
              <MathFieldComponent
                mathFieldConfig={{ readOnly: true }}
                latex="Z = \dfrac{x-\mu}{\sigma}"
              />
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              Assuming a normal distrubution of data (a <b>very</b> dangerous
              assumption), a Z-score over 2 would only have a ~2.3% chance of
              occuring. This tells you that the net position is extremely out of the
              ordinary and could possibly be taken advantage of. Make your own
              conclusions of what that means from a price perspective. Now, that
              I am thinking about it, testing to see if the data is normally
              distrubted would be a good extension to this project. I can almost
              certainly bet that it is not.
            </Typography>
            <br/>
            <Grid container justify="center">
              <img
                alt="CftcEx"
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                src='https://www.investopedia.com/thmb/vJhdaOLCsCPA9UBh6eXk8vgBaAE=/1878x1056/smart/filters:no_upscale()/Z-dc7881981d5b4ab5a8765f2a293c9552.png'
              />
            </Grid>
            <CftcApiSection />
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
                <Button
                  href="https://github.com/ghardin1314/GRHrest/blob/master/backend/CftcData/api/pullCFTC.py"
                  variant="contained"
                  className={classes.linkCard}
                >
                  <Typography variant="h6" align="center">
                    Webscraping CFTC <br /> website for recent <br /> and
                    historical data
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} md={6} lg={3} className={classes.linkGrid}>
                <Button
                  href="https://github.com/ghardin1314/GRHrest/blob/master/backend/autoscrape/pull_car_data.py"
                  variant="contained"
                  className={classes.linkCard}
                >
                  <Typography variant="h6" align="center">
                    Pulling from database <br /> and calculating statistics
                  </Typography>
                </Button>
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
