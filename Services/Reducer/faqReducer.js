import * as types from "../Constants/index";

const initialState = {
  faqs: [],
  allFaqs: [],
  faq: {},
  loading: true,
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FAQS:
      return {
        ...state,
        faqs: action.payload,
        loading: false, 
      };
    case types.GET_ALL_FAQS:
      return {
        ...state,
        allFaqs: action.payload,
        loading: false, 
      };
    case types.DELETE_FAQ:
    case types.ADD_FAQ:
    case types.UPDATE_FAQ:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_FAQ:
      return {
        ...state,
        faq: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default faqReducer;
