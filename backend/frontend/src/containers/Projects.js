import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import ProjectCard from "../components/ProjectCard";

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: theme.spacing(2),
    display: "flex",
  },
  card:{
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: '100%'
  },
}));

export default function Projects() {
  const projects = useSelector((state) => state.Projects);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <br />
        <Grid container item>
          <Typography variant="h2">Projects</Typography>
        </Grid>
        <br />
        <br />
        <Grid container alignItems="stretch">
          {projects.map((proj) => (
            <Grid item md={4} sm={6} s={12} className={classes.grid}>
              <ProjectCard data={proj} className={classes.card}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
