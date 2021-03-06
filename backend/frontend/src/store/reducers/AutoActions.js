import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

// I should split this into different reducers at somepoint to reduce clutter and state overload

const initialState = {
  Projects: [],
  Makes: [],
  Models: [],
  Trims: [],
  MakeSelection: "",
  MakeName: "",
  ModelSelection: "",
  ModelName: "",
  TrimSelection: "",
  TrimName: "",
  ModelDeactive: true,
  TrimDeactive: true,
  SubmitDeactive: true,
  Results: [],
  loading: false,
  unpackedData: [],
  BestBuy: {
    year: [],
    miles: [],
    price: [],
  },
  Surface: {
    x: [],
    y: [],
    z: [],
  },
  showScatter: true,
  showBest: true,
  showSurface: true,
  activeStep: 0,
  visSteps: [],
  CftcKeys: [],
  CftcData: [{
    'Latest': 0,
    'W/W Chg': 0,
    '3M Avg': 0,
    '6M Avg': 0,
    '1Y Avg': 0,
    '3Y Max': 0,
    '3Y Min': 0,
    'Last Updated': ''
  }],
};

const startRequest = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const requestSuccess = (state, action) => {
  return updateObject(state, {
    [action.item]: action.value,
    loading: false,
  });
};

const updateSelection = (state, action) => {
  return updateObject(state, {
    [action.field]: action.selection,
  });
};

const unpackData = (state, action) => {
  function unpack(data, key) {
    return data.map(function (data) {
      return data[key];
    });
  }

  var unpackedData = {
    x: unpack(state.Results, "year"),
    y: unpack(state.Results, "miles"),
    z: unpack(state.Results, "price"),
    mode: "markers",
    marker: {
      size: 12,
      line: {
        color: "rgba(217, 217, 217, 0.14)",
        width: 0.5,
      },
      opacity: 0.8,
    },
    type: "scatter3d",
  };

  return updateObject(state, {
    unpackedData: unpackedData,
  });
};

const AutoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_REQUEST:
      return startRequest(state, action);
    case actionTypes.REQUEST_SUCCESS:
      return requestSuccess(state, action);
    case actionTypes.UPDATE_FIELD:
      return updateSelection(state, action);
    case actionTypes.UNPACK_DATA:
      return unpackData(state, action);
    default:
      return state;
  }
};

export default AutoReducer;
