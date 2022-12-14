import * as types from "../Constants/index";

const initialState = {
  productAttributes: [],
  allProductAttributes: [],
  productAttribute: {},
  loading: true,
};

const productAttributeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        productAttributes: action.payload,
        loading: false, 
      };
    case types.GET_ALL_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        allProductAttributes: action.payload,
        loading: false, 
      };
    case types.DELETE_PRODUCT_ATTRIBUTE:
    case types.ADD_PRODUCT_ATTRIBUTE:
    case types.UPDATE_PRODUCT_ATTRIBUTE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT_ATTRIBUTE:
      return {
        ...state,
        productAttribute: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productAttributeReducer;
