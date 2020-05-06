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

export const getCftcKeys = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios.get("/api/cftc/getCFTCkeys/").then((res) => {
      const data = res.data;
      dispatch(requestSuccess("CftcKeys", data));
    });
  };
};

export const getCftcData = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios.get("/api/cftc/getCFTCdata/", params).then((res) => {
      const data = res.data;
      dispatch(requestSuccess("CftcData", data.results));
    });
  };
};

export const populateCftcTable = (params) => {
  return (dispatch) => {
    dispatch(startRequest());
    axios.get("/api/cftc/getCFTCkeys/").then((res) => {
      const data = res.data;
      dispatch(requestSuccess("CftcKeys", data.keys));
      const params = {
        params: {
          keys: JSON.stringify(data.keys),
        },
      };
      dispatch(getCftcData(params));
    });
  };
};
