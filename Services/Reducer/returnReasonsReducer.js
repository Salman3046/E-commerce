import * as types from "../Constants/index";

const initialState = {
  returnReasons: [],
  singleReturnReasons: {},
  returnSubReasons: [],
  returnSubReasonsById: [],
  loading: true,
};

const returnReasonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RETURN_REASONS:
      return {
        ...state,
        returnReasons: action.payload,
        loading: false,
      };
    case types.GET_SINGLE_RETURN_REASONS:
      return {
        ...state,
        singleReturnReasons: action.payload,
        loading: false,
      };
    case types.GET_RETURN_SUB_REASONS:
      return {
        ...state,
        returnSubReasons: action.payload,
        loading: false,
      };
    case types.GET_RETURN_SUB_REASONS_BY_ID:
      return {
        ...state,
        returnSubReasonsById: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default returnReasonsReducer;
