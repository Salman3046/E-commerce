import * as types from "../Constants/index";

const initialState = {
  products: [],
  allProducts: [],
  allProductsByCategory: [],
  allProductsBySubcategory: [],
  allProductsByBrand: [],
  featuredProducts: [],
  newArrivalProducts: [],
  similarProducts: [],
  product: {},
  loading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false, 
      };
    case types.GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false, 
      };
    case types.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        allProductsByCategory: action.payload,
        loading: false, 
      };
    case types.GET_PRODUCTS_BY_SUBCATEGORY:
      return {
        ...state,
        allProductsBySubcategory: action.payload,
        loading: false, 
      };
    case types.GET_PRODUCTS_BY_BRAND:
      return {
        ...state,
        allProductsByBrand: action.payload,
        loading: false, 
      };
    case types.GET_FEATURED_PRODUCTS:
      return {
        ...state,
        featuredProducts: action.payload,
        loading: false, 
      };
    case types.GET_NEW_ARRIVAL_PRODUCTS:
      return {
        ...state,
        newArrivalProducts: action.payload,
        loading: false, 
      };
    case types.GET_SIMILAR_PRODUCTS:
      return {
        ...state,
        similarProducts: action.payload,
        loading: false, 
      };
    case types.DELETE_PRODUCT:
    case types.ADD_PRODUCT:
    case types.UPDATE_PRODUCT:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
