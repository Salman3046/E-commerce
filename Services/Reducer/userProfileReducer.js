import * as types from "../Constants/index";

const initialState = {
  userProfile: {},
  loading: true,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_BY_ID:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
      case types.UPDATE_PROFILE_BY_ID:
        return {
          ...state,
          loading: false,
        };
    default:
      return state;
  }
};

export default userProfileReducer;
