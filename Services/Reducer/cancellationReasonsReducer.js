import * as types from "../Constants/index";

const initialState = {
  cancellationReasons: [],
  loading: true,
};

const cancellationReasonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CANCELLATION_REASONS:
      return {
        ...state,
        cancellationReasons: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default cancellationReasonsReducer;
