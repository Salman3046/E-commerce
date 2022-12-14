import * as types from "../Constants/index";

const initialState = {
  helps: [],
  help: {},
  loading: true,
};

const helpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_HELPS:
      return {
        ...state,
        helps: action.payload,
        loading: false, 
      };
    case types.DELETE_HELP:
    case types.ADD_HELP:
    case types.UPDATE_HELP:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_HELP:
      return {
        ...state,
        help: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default helpReducer;
