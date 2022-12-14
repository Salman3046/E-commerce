import * as types from "../Constants/index";

const initialState = {
  aboutPage: {},
  privacyPage: {},
  refundPage: {},
  termsPage: {},
  loading: true,
};

const customPagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ABOUT_PAGE:
      return {
        ...state,
        aboutPage: action.payload,
        loading: false, 
      };
    case types.UPDATE_ABOUT_PAGE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_PRIVACY_PAGE:
      return {
        ...state,
        privacyPage: action.payload,
        loading: false, 
      };
    case types.UPDATE_PRIVACY_PAGE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_REFUND_PAGE:
      return {
        ...state,
        refundPage: action.payload,
        loading: false, 
      };
    case types.UPDATE_REFUND_PAGE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_TERMS_PAGE:
      return {
        ...state,
        termsPage: action.payload,
        loading: false, 
      };
    case types.UPDATE_TERMS_PAGE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default customPagesReducer;
