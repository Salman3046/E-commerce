import * as types from "../Constants/index";

const initialState = {
  paymentMethods: [],
  loading: true,
};

const paymentMethodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PAYMENTS_METHOD:
      return {
        ...state,
        paymentMethods: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default paymentMethodsReducer;
