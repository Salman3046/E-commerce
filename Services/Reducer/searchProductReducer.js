import * as types from "../Constants/index";

const initialState = {
  searchedProducts: [],
  loading: true,
};

const searchProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default searchProductReducer;
