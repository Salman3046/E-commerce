import * as types from "../Constants/index";

const initialState = {
  productBrands: [],
  allProductBrands: [],
  productBrand: {},
  loading: true,
};

const productBrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_BRANDS:
      return {
        ...state,
        productBrands: action.payload,
        loading: false, 
      };
    case types.GET_ALL_PRODUCT_BRANDS:
      return {
        ...state,
        allProductBrands: action.payload,
        loading: false, 
      };
    case types.DELETE_PRODUCT_BRAND:
    case types.ADD_PRODUCT_BRAND:
    case types.UPDATE_PRODUCT_BRAND:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT_BRAND:
      return {
        ...state,
        productBrand: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productBrandReducer;
