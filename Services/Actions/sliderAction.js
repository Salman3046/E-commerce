import * as types from '../Constants/index';
import axios from 'axios';

const getSliders = (sliders) => ({
    type: types.GET_SLIDERS,
    payload: sliders,
});

const getAllSliders = (allSliders) => ({
    type: types.GET_ALL_SLIDERS,
    payload: allSliders,
});

const sliderAdded = () => ({
    type: types.ADD_SLIDER,
});

const sliderDeleted = () => ({
    type: types.DELETE_SLIDER,
})

const getSlider = (slider) => ({
    type: types.GET_SINGLE_SLIDER,
    payload: slider,
})

const sliderUpdated = () => ({
    type: types.UPDATE_SLIDER,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all slider
export const loadSliders = () => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/sliders`)
            .then((res) => {
                dispatch(getSliders(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all slider
export const loadAllSliders = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/sliders/all`, config(token))
            .then((res) => {
                dispatch(getAllSliders(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete slider

export const deleteSlider = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/sliders/${id}`, config(token))
            .then((res) => {
                dispatch(sliderDeleted(res.data.data));
                dispatch(loadSliders(token));
                dispatch(loadAllSliders(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add slider
export const addSlider = (slider, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/sliders/`, slider, config(token))
            .then((res) => {
                dispatch(sliderAdded(res.data.data));
                dispatch(loadSliders(token));
                dispatch(loadAllSliders(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  slider
export const getSingleSlider = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/sliders/${id}`, config(token))
            .then((res) => {
                dispatch(getSlider(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update slider
export const updateSlider = (slider, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/sliders/${id}`, slider, config(token))
            .then((res) => {
                dispatch(sliderUpdated());
                dispatch(loadSliders(token));
                dispatch(loadAllSliders(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};