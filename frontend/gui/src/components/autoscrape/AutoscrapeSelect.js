import React, { useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AutoscrapeSelect() {
  const [state, setState] = React.useState({
    Makes: [],
    Models: [],
    Trims: [],
    MakeSelection: "",
    ModelSelection: "",
    TrimSelection: "",
    ModelDeactive: true,
    TrimDeactive: true,
    SubmitDeactive: true,
  });

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/autoscrape/populatedMakes/")
      .then((res) => {
        setState({
          ...state,
          ["Makes"]: res.data,
        });
      });
  }, ["Makes"]);

  const populateModels = (makeID) => {
    axios
      .get("http://localhost:8000/api/autoscrape/populatedModels/", {
        params: {
          carmake_pk: makeID,
        },
      })
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          ["Models"]: res.data,
          ["Trims"]: [],
          ["MakeSelection"]: makeID,
          ["ModelDeactive"]: false,
          ["TrimDeactive"]: true,
          ["ButtonDeactive"]: true,
        });
      });
  };

  const populateTrims = (modelID) => {
    axios
      .get("http://localhost:8000/api/autoscrape/populatedTrims/", {
        params: {
          carmodel_pk: modelID,
        },
      })
      .then((res) => {
        console.log(res.data);
        setState({
          ...state,
          ["Trims"]: res.data,
          ["ModelSelection"]: modelID,
          ["TrimDeactive"]: false,
          ["ButtonDeactive"]: true,
        });
      });
  };

  function makeHasModels(makeID) {
    return axios
      .get("http://localhost:8000/api/autoscrape/makeHasModels/", {
        params: {
          carmake_pk: makeID,
        },
      })
      .then((res) => {
        return res.data.response;
      });
  }

  function modelHasTrims(modelID) {
    return axios
      .get("http://localhost:8000/api/autoscrape/modelHasTrims/", {
        params: {
          carmodel_pk: modelID,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data.response;
      });
  }

  const handleChooseMake = (event) => {
    switch (event.target.value) {
      case "":
        break;
      default:
        const makeID = Number(event.target.value);
        makeHasModels(makeID).then((response) => {
          if (response == true) {
            populateModels(makeID);
          } else {
            setState({
              ...state,
              ["Models"]: [],
              ["Trims"]: [],
              ["MakeSelection"]: makeID,
              ["ModelDeactive"]: true,
              ["TrimDeactive"]: true,
              ["SubmitDeactive"]: false,
            });
          }
        });
    }
  };

  function getResults() {
    axios.get("http://localhost:8000/api/autoscrape/results/", {
      params: {
        carmake_pk: state.MakeSelection,
        carmodel_pk: state.ModelSelection,
        cartrim_pk: state.TrimSelection,
      },
    })
    .then((res) => {
      console.log(res.data);
    });
    axios.get("http://localhost:8000/api/autoscrape/getBestBuy/", {
      params: {
        carmake_pk: state.MakeSelection,
        carmodel_pk: state.ModelSelection,
        cartrim_pk: state.TrimSelection,
      },
    })
    .then((res) => {
      console.log(res.data);
    });
  }

  const handleChooseModel = (event) => {
    switch (event.target.value) {
      case "":
        break;
      default:
        const modelID = Number(event.target.value);
        modelHasTrims(modelID).then((response) => {
          if (response == true) {
            populateTrims(modelID);
          } else {
            setState({
              ...state,
              ["Trims"]: [],
              ["ModelSelection"]: modelID,
              ["SubmitDeactive"]: false,
            });
          }
        });
    }
  };

  const handleChooseTrim = (event) => {
    switch (event.target.value) {
      case "":
        break;
      default:
        const trimID = Number(event.target.value);
        setState({
          ...state,
          ["TrimSelection"]: trimID,
          ["SubmitDeactive"]: false,
        });
    }
  };

  return (
    <div>
      <form>
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
              <option value={make.id}>{make.name}</option>
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
              <option value={model.id}>{model.name}</option>
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
              <option value={trim.id}>{trim.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button disabled={state.SubmitDeactive} variant="contained" onClick={getResults}>
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
}
