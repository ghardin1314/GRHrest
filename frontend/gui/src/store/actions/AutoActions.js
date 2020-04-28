import * as actionTypes from "./actionTypes";
import axios from "axios";

export const startRequest = () => {
  return {
    type: actionTypes.START_REQUEST,
  };
};

export const requestSuccess = (item, value) => {
  return {
    type: actionTypes.REQUEST_SUCCESS,
    item: item,
    value: value,
  };
};

export const getAutoMakes = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios
      .get("http://localhost:8000/api/autoscrape/populatedMakes/")
      .then((res) => {
        const data = res.data;
        // console.log(data);
        dispatch(requestSuccess("Makes", data));
      });
  };
};

export const getAutoModels = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios
      .get("http://localhost:8000/api/autoscrape/populatedModels/", params)
      .then((res) => {
        const data = res.data;
        dispatch(requestSuccess("Models", data));
        if (data.length !== 0) {
          dispatch(updateSelection("ModelDeactive", false));
          dispatch(updateSelection("TrimDeactive", true));
          dispatch(updateSelection("SubmitDeactive", true));
        } else {
          dispatch(updateSelection("SubmitDeactive", false));
          dispatch(updateSelection("ModelDeactive", true));
        }
      });
  };
};

export const getAutoTrims = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios
      .get("http://localhost:8000/api/autoscrape/populatedTrims/", params)
      .then((res) => {
        const data = res.data;
        dispatch(requestSuccess("Trims", data));
        if (data.length !== 0) {
          dispatch(updateSelection("TrimDeactive", false));
          dispatch(updateSelection("SubmitDeactive", true));
        } else {
          dispatch(updateSelection("TrimDeactive", true));
          dispatch(updateSelection("SubmitDeactive", false));
        }
      });
  };
};

export const getAutoResults = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios
      .get("http://localhost:8000/api/autoscrape/results/", params)
      .then((res) => {
        const data = res.data;
        dispatch(requestSuccess("Results", data[0]['results']));
        dispatch(requestSuccess("BestBuy", data[1]['bestBuy']));
        dispatch(requestSuccess("Surface", data[2]['surface']));
        dispatch(unpackData())
      });
  };
};

export const updateSelection = (field, selection) => {
  return {
    type: actionTypes.UPDATE_FIELD,
    field: field,
    selection: selection,
  };
};

export const unpackData = () => {
  return {
    type: actionTypes.UNPACK_DATA,
  };
}
