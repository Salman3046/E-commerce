import * as types from "../Constants/index";

const initialState = {
  productCategories: [],
  allProductCategories: [],
  productCategory: {},
  loading: true,
};

const productCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_CATEGORYS:
      return {
        ...state,
        productCategories: action.payload,
        loading: false, 
      };
    case types.GET_ALL_PRODUCT_CATEGORYS:
      return {
        ...state,
        allProductCategories: action.payload,
        loading: false, 
      };
    case types.DELETE_PRODUCT_CATEGORY:
    case types.ADD_PRODUCT_CATEGORY:
    case types.UPDATE_PRODUCT_CATEGORY:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategory: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productCategoryReducer;
