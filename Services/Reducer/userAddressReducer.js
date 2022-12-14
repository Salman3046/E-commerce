import * as types from "../Constants/index";

const initialState = {
  userAddresses: [],
  userAddressesById: [],
  userAddress: {},
  loading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_ADDRESSS:
      return {
        ...state,
        userAddresses: action.payload,
        loading: false, 
      };
    case types.GET_USER_ADDRESSS_BY_USER_ID:
      return {
        ...state,
        userAddressesById: action.payload,
        loading: false, 
      };
    case types.DELETE_USER_ADDRESS:
    case types.ADD_USER_ADDRESS:
    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
