import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions/AutoActions";
import {
  MakeBlockAPI,
  ModelBlockAPI,
  TrimBlockAPI,
  ResultsBlockAPI,
} from "./apiDocs";

import Typography from "@material-ui/core/Typography";

export default function AutoApiSection() {
  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  const dispatch = useDispatch();

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
    <React.Fragment>
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
        Get primary keys, name, and query value for every make. Use id if you
        only want one make.
      </Typography>
      <MakeBlockAPI />
      <Typography variant="subtitle1" gutterBottom>
        Get primary keys, name, and query value for every model. Use id if you
        only want one model. To get all models of a specific make, use the make
        primary key.
      </Typography>
      <ModelBlockAPI />
      <Typography variant="subtitle1" gutterBottom>
        Get primary keys, name, and query value for every trim. Use id if you
        only want one trim. To get all trim of a specific make or model, use the
        make or model primary key.
      </Typography>
      <TrimBlockAPI />
      <Typography variant="subtitle1" gutterBottom>
        Get results for specific make, model, or trim. One primary key must be
        passed to get results.
      </Typography>
      <ResultsBlockAPI />
    </React.Fragment>
  );
}
