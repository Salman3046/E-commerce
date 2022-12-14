import * as types from "../Constants/index";

const initialState = {
  cart: [],
  alreadyAdded: false,
  finalQuantity: 1,
  loading: true,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FROM_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false, 
      };
    case types.CHECK_ALREADY_ADD:
      return {
        ...state,
        alreadyAdded: action.payload,
        loading: false, 
      };
    case types.UNIQUE_ITEM_QUANTITY:
      return {
        ...state,
        finalQuantity: action.payload,
        loading: false, 
      };
    case types.ADD_TO_CART:
    case types.REMOVE_FROM_CART:
    case types.DELETE_FROM_CART:
    case types.EMPTY_CART:
    default:
      return state;
  }
};

export default cartReducer;
