import * as types from "../Constants/index";

const initialState = {
  sliders: [],
  allSliders: [],
  slider: {},
  loading: true,
};

const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SLIDERS:
      return {
        ...state,
        sliders: action.payload,
        loading: false, 
      };
    case types.GET_ALL_SLIDERS:
      return {
        ...state,
        allSliders: action.payload,
        loading: false, 
      };
    case types.DELETE_SLIDER:
    case types.ADD_SLIDER:
    case types.UPDATE_SLIDER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_SLIDER:
      return {
        ...state,
        slider: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default sliderReducer;
