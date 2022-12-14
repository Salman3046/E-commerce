import * as types from '../Constants/index';
import axios from 'axios';

const getHelps = (helps) => ({
    type: types.GET_HELPS,
    payload: helps,
});

const helpAdded = () => ({
    type: types.ADD_HELP,
});

const helpDeleted = () => ({
    type: types.DELETE_HELP,
})

const getHelp = (help) => ({
    type: types.GET_SINGLE_HELP,
    payload: help,
})

const helpUpdated = () => ({
    type: types.UPDATE_HELP,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all Help
export const loadHelps = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/help`, config(token))
            .then((res) => {
                dispatch(getHelps(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete Help

export const deleteHelp = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/help/${id}`, config(token))
            .then((res) => {
                dispatch(helpDeleted(res.data.data));
                dispatch(loadHelps(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add Help
export const addHelp = (help, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/help/`, help, config(token))
            .then((res) => {
                dispatch(helpAdded(res.data.data));
                dispatch(loadHelps(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  Help
export const getSingleHelp = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/help/${id}`, config(token))
            .then((res) => {
                dispatch(getHelp(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update Help
export const updateHelp = (help, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/help/${id}`, help, config(token))
            .then((res) => {
                dispatch(helpUpdated());
                dispatch(loadHelps(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};