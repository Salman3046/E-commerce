import * as types from "../Constants/index";

const initialState = {
  orderStatus: [],
  orderStatusLogs: [],
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDER_STATUS:
      return {
        ...state,
        orderStatus: action.payload,
        loading: false, 
      };
    case types.GET_ORDER_STATUS_LOGS:
      return {
        ...state,
        orderStatusLogs: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default userReducer;
