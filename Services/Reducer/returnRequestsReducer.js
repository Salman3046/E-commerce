import * as types from "../Constants/index";

const initialState = {
  returnRequests: [],
  returnRequest: {},
  loading: true,
};

const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RETURN_REQUESTS:
      return {
        ...state,
        returnRequests: action.payload,
        loading: false, 
      };
    case types.GET_SINGLE_RETURN_REQUESTS:
      return {
        ...state,
        returnRequest: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default sliderReducer;
