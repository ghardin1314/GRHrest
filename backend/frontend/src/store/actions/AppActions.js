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
  

export const getProjects = (params) => {
    return (dispatch) => {
      dispatch(startRequest());
      axios
        .get("/api/projects/")
        .then((res) => {
          const data = res.data;
          // console.log(data);
          dispatch(requestSuccess("Projects", data));
        });
    };
  };

