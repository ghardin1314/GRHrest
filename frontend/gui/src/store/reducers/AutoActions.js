import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  Makes: [],
  Models: [],
  Trims: [],
  MakeSelection: '',
  ModelSelection: '',
  TrimSelection: '',
  ModelDeactive: true,
  TrimDeactive: true,
  SubmitDeactive: true,
  Results: [],
  loading: false,
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

const AutoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_REQUEST:
      return startRequest(state, action);
    case actionTypes.REQUEST_SUCCESS:
      return requestSuccess(state, action);
    case actionTypes.UPDATE_FIELD:
        return updateSelection(state, action);
    default:
      return state;
  }
};

export default AutoReducer;
