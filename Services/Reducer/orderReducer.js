import * as types from "../Constants/index";

const initialState = {
  orders: [],
  ordersByUser: [],
  order: {},
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false, 
      };
    case types.GET_ORDERS_BY_USER_ID:
      return {
        ...state,
        ordersByUser: action.payload,
        loading: false, 
      };
    case types.ADD_ORDER:
    case types.UPDATE_ORDER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
