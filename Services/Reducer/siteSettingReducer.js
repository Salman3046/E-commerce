import * as types from "../Constants/index";

const initialState = {
  siteSettings: {},
  loading: true,
};

const siteSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SITE_SETTINGS:
      return {
        ...state,
        siteSettings: action.payload,
        loading: false, 
      };
    case types.UPDATE_SITE_SETTING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default siteSettingReducer;
