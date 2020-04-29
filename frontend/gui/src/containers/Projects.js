import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import ProjectCard from "../components/ProjectCard";

export default class Projects extends Component {
  CardItems = [];

  state = {
    projects: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8000/api/projects/").then((res) => {
      console.log(res.data);
      this.setState({ projects: res.data });
    });
  }

  render() {
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
              {this.state.projects.map((proj) => (
                <ProjectCard data={proj} />
              ))}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
