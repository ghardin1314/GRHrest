import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import ProjectCard from "../components/ProjectCard";

export default function Projects () {

  const projects = useSelector((state) => state.Projects);

    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <br />
          <Grid container item>
            <Typography variant="h2">Projects</Typography>
          </Grid>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item md={4} sm={6} s={12}>
              {projects.map((proj) => (
                <ProjectCard data={proj} />
              ))}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
}
