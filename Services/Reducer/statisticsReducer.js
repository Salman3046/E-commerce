import * as types from "../Constants/index";

const initialState = {
  statistics: [],
  loading: true,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATISTICS:
      return {
        ...state,
        statistics: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default statisticsReducer;
