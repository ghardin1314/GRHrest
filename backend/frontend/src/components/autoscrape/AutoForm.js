import React from "react";
// import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";

import {
  MakeSelect,
  ModelSelect,
  TrimSelect,
  SubmitSelect,
  CheckBoxes,
} from "./AutoSelects";

export default function AutoForm() {

  return (
    <div>
      <Grid
        container
        spacing={1}
        justify="center"
        alignContent="center"
        alignItems="center"
        row
      >
        <Grid item justify="center" style={{ flexShrink: 1 }}>
          <MakeSelect />
        </Grid>
        <Grid item justify="center" style={{ flexShrink: 1 }}>
          <ModelSelect />
        </Grid>
        <Grid item justify="center" style={{ flexShrink: 1 }}>
          <TrimSelect />
        </Grid>
        <Grid item justify="center" style={{ flexShrink: 1 }}>
          <SubmitSelect />
        </Grid>
        <Grid item justify="center" style={{ flexShrink: 1 }}>
          <CheckBoxes />
        </Grid>
      </Grid>
    </div>
  );
}
