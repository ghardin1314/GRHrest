import React from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import MyRocket from "../components/MyRocket";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    flexGrow: 1,
    direction: "column",
  },
  paper: {
    marginTop: theme.spacing(1),
    height: "70vh",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  body: {
    margin: theme.spacing(3),
  },
  connectRow: {
    marginTop: theme.spacing(3),
  },
  connectIcon: {
    fontSize: 60,
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item className={classes.grid}>
        <Paper elevation={5} className={classes.paper}>
          <Typography variant="h1" display="block" align="center">
            <b>Hi, I'm Garrett!</b>
          </Typography>
        </Paper>
      </Grid>

      <Grid
        container
        spacing={3}
        justify="center"
        className={classes.connectRow}
      >
        <Grid item>
          <IconButton
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://www.linkedin.com/in/garrett-hardin-726446101/"
            className={classes.connectButton}
          >
            <LinkedInIcon className={classes.connectIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://github.com/ghardin1314"
            className={classes.connectButton}
          >
            <GitHubIcon className={classes.connectIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color="secondary"
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/view_of_a_g/"
            className={classes.connectButton}
          >
            <InstagramIcon className={classes.connectIcon} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" alignItems="center">
        <ThemeProvider
          theme={(theme) =>
            createMuiTheme({
              ...theme,
              overrides: {
                MuiTypography: {
                  root: {
                    marginTop: theme.spacing(3),
                    marginBottom: theme.spacing(3),
                  },
                },
              },
            })
          }
        >
          <Grid item xs={12} md={5} className={classes.body}>
            <Typography variant="h4" gutterBottom align="left">
              About Me:
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              <p>
                Welcome, my name is Garrett Hardin. This site is going to be a
                collection of my often random, often obtuse, but always
                interesting (at least to me) projects. I am classicly trained as
                a mechincal engineer and my day job is an Aerospace engineer,
                but I always like to tinker and figure out how things work.
              </p>
              <p>
                This led me into the wonderful world of coding since so much of
                our world is driven by it. I started off coding python to
                analyze financial data to help drive investment decisions. This
                turned out to be quite fun and I spent a possibly exorbitant
                amount of time learning, practicing, and creating code to
                augment various interests in Automotive, Finance, and Buisness.
              </p>
              <p>
                After creating quite a few projects, I wanted a good way to
                share them with the world. I decided this would also be a good
                time to learn the always useful skill of web development and
                thus, this site was born.
              </p>
            </Typography>
            <Typography variant="h4" gutterBottom align="left">
              Goals:
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              <p>
                I would like to document all of my projects in some interactive
                way. This might be with some data visualization technique, and
                will also include public api documentation, where possible,
                incase anyone would like to plug into what I have done. Each
                project will also include links to a pubic repository if you
                would like to clone it for yourself to tinker.
              </p>
              <p>
                I'd also love to find people to collaborate with on future
                interesting projects. If you have an interesting idea and think
                I could help, please feel free to reach out! Also, no one ever
                accused me of being a designer. So, if you have design tips, I'm
                all ears.
              </p>
            </Typography>
            <Typography variant="h4" gutterBottom align="left">
              Projects:
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              The first project of this site is the website itself, which I am
              calling GRH Analytics! Tech Stack:
              <ul>
                <li>React (Frontend)</li>
                <li>Redux (State Management)</li>
                <li>Material-UI (Components/Styling)</li>
                <li>Django (Rest API Backend)</li>
                <li>MySQL (Database)</li>
              </ul>
              This is probably overkill for a portfolio site, but I wanted the
              experience and ability to create full stack web applications. I'll
              be porting over many of my exsisting projects and turning them
              into web apps over time. Please visit the projects page to see how
              far I have gotten.
            </Typography>
          </Grid>
        </ThemeProvider>
        <Grid
          item
          container
          xs={12}
          md={5}
          justify="center"
          alignItems="center"
        >
          <MyRocket />
        </Grid>
      </Grid>
    </div>
  );
}
