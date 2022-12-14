import * as types from "../Constants/index";

const initialState = {
  coupons: [],
  allCoupons: [],
  coupon: {},
  loading: true,
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUPONS:
      return {
        ...state,
        coupons: action.payload,
        loading: false, 
      };
    case types.GET_ALL_COUPONS:
      return {
        ...state,
        allCoupons: action.payload,
        loading: false, 
      };
    case types.DELETE_COUPON:
    case types.ADD_COUPON:
    case types.UPDATE_COUPON:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_COUPON:
      return {
        ...state,
        coupon: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default couponReducer;
