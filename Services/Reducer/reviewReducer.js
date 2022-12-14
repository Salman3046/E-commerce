import * as types from "../Constants/index";

const initialState = {
  reviewsByProductId: [],
  loading: true,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_REVIEWS_BY_PRODUCT_ID:
      return {
        ...state,
        reviewsByProductId: action.payload,
        loading: false, 
      };
    case types.ADD_REVIEW:
    default:
      return state;
  }
};

export default reviewReducer;
