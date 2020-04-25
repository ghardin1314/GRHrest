import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import * as actions from "../../store/actions/AutoActions";
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
// import NativeSelect from "@material-ui/core/NativeSelect";
// import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent:'center', 
    alignItems:'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 'sm'
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
}));

export default function AutoscrapeSelect() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(actions.getAutoMakes());
  }, []);

  const populateModels = (makeID) => {
    const params = {
      params: {
        carmake_pk: makeID,
      },
    };
    dispatch(actions.getAutoModels(params));
  };

  const populateTrims = (modelID) => {
    const params = {
      params: {
        carmodel_pk: modelID,
      },
    };
    dispatch(actions.getAutoTrims(params));
  };

  function getResults() {
    dispatch(
      actions.getAutoResults({
        params: {
          carmake_pk: state.MakeSelection,
          carmodel_pk: state.ModelSelection,
          cartrim_pk: state.TrimSelection,
        },
      })
    );
  }

  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  const handleChooseMake = (event) => {
    switch (event.target.value) {
      case "":
        break;
      default:
        const makeID = Number(event.target.value);
        const MakeName = state.Makes.find(name=> name.id === makeID).name

        updateSelection("MakeSelection", makeID);
        updateSelection("MakeName", MakeName);
        populateModels(makeID);
        updateSelection("ModelSelection", "");
        updateSelection("TrimSelection", "");
        updateSelection("TrimDeactive", true);
        updateSelection("ModelDeactive", true);
        updateSelection("ModelName", '');
        updateSelection("TrimName", '');
    }
  };

  const handleChooseModel = (event) => {
    switch (event.target.value) {
      case "":
        break;
      default:
        const modelID = Number(event.target.value);
        const ModelName = state.Models.find(name=> name.id === modelID).name
        
        updateSelection("ModelSelection", modelID);
        updateSelection("ModelName", ModelName);
        updateSelection("TrimDeactive", true);
        updateSelection("TrimSelection", "");
        updateSelection("TrimName", '');
        populateTrims(modelID);
    }
  };

  const handleChooseTrim = (event) => {
    switch (event.target.value) {
      case "":
        break;
      default:
        const trimID = Number(event.target.value);
        const TrimName = state.Trims.find(name=> name.id === trimID).name

        updateSelection("TrimSelection", trimID);
        updateSelection("TrimName", TrimName);
        updateSelection("SubmitDeactive", false);
    }
  };

  const handleChange = (event) => {
    updateSelection([event.target.name], event.target.checked );
  };

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="car-makes">Make</InputLabel>
          <Select
            native
            value={state.MakeSelection}
            onChange={handleChooseMake}
            inputProps={{
              name: "makes",
              id: "car-makes",
            }}
          >
            <option aria-label="None" value=""></option>
            {state.Makes.map((make) => (
              <option key={make.id} value={make.id}>{make.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="car-model">Model</InputLabel>
          <Select
            native
            disabled={state.ModelDeactive}
            value={state.ModelSelection}
            onChange={handleChooseModel}
            inputProps={{
              name: "model",
              id: "car-model",
            }}
          >
            <option aria-label="None" value=""></option>
            {state.Models.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="car-trim">Trim</InputLabel>
          <Select
            native
            disabled={state.TrimDeactive}
            value={state.TrimSelection}
            onChange={handleChooseTrim}
            inputProps={{
              name: "trim",
              id: "car-trim",
            }}
          >
            <option aria-label="None" value="" />
            {state.Trims.map((trim) => (
              <option key={trim.id} value={trim.id}>{trim.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button
            disabled={state.SubmitDeactive}
            variant="contained"
            onClick={getResults}
          >
            Submit
          </Button>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Show: </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={state.showScatter} onChange={handleChange} name="showScatter" />}
            label="Scatter"
          />
          <FormControlLabel
            control={<Checkbox checked={state.showBest} onChange={handleChange} name="showBest" />}
            label="Best"
          />
          <FormControlLabel
            control={<Checkbox checked={state.showSurface} onChange={handleChange} name="showSurface" />}
            label="Surface"
          />
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
    </div>
  );
}
