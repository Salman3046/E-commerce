import * as types from "../Constants/index";

const initialState = {
  productSubCategories: [],
  allProductSubCategories: [],
  productSubCategory: {},
  loading: true,
};

const productSubCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_SUB_CATEGORYS:
      return {
        ...state,
        productSubCategories: action.payload,
        loading: false, 
      };
    case types.GET_ALL_PRODUCT_SUB_CATEGORYS:
      return {
        ...state,
        allProductSubCategories: action.payload,
        loading: false, 
      };
    case types.DELETE_PRODUCT_SUB_CATEGORY:
    case types.ADD_PRODUCT_SUB_CATEGORY:
    case types.UPDATE_PRODUCT_SUB_CATEGORY:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT_SUB_CATEGORY:
      return {
        ...state,
        productSubCategory: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productSubCategoryReducer;
