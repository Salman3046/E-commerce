import * as types from "../Constants/index";

const initialState = {
  wishlistByUserId: [],
  loading: true,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WISHLIST_BY_USERID:
      return {
        ...state,
        wishlistByUserId: action.payload,
        loading: false, 
      };
    default:
      return state;
  }
};

export default wishlistReducer;
