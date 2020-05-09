import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  connectRow: {
    marginTop: theme.spacing(3),
  },

  connectIcon: {
    fontSize: 60,
  },
}));

export default function Feedback() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body1" gutterBottom align="left">
        Have some feedback about how this project could be better? Questions
        about some of the methods used? Want to collaborate on a similar (or not
        so similar) project? Don't hesitate to reach out!
      </Typography>
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
    </div>
  );
}
