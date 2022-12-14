import * as types from "../Constants/index";

const initialState = {
  payments: [],
  allPayments: [],
  payment: {},
  loading: true,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
        loading: false, 
      };
    case types.GET_ALL_PAYMENTS:
      return {
        ...state,
        allPayments: action.payload,
        loading: false, 
      };
    case types.UPDATE_PAYMENT:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default paymentReducer;
