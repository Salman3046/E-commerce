import * as types from '../Constants/index';
import axios from 'axios';

const getReturnReasons= (returnReasons) => ({
    type: types.GET_RETURN_REASONS,
    payload: returnReasons,
});
const getReturnReason = (singleReturnReasons) => ({
    type: types.GET_SINGLE_RETURN_REASONS,
    payload: singleReturnReasons,
})

const getReturnSubReasons= (returnSubReasons) => ({
    type: types.GET_RETURN_SUB_REASONS,
    payload: returnSubReasons,
});
const getReturnSubReasonsById = (returnSubReasonsById) => ({
    type: types.GET_RETURN_SUB_REASONS_BY_ID,
    payload: returnSubReasonsById,
})

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all return reasons
export const loadReturnReasons = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/return-reasons`, config(token))
            .then((res) => {
                dispatch(getReturnReasons(res.data.data.rows))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all return sub reasons
export const loadReturnSubReasons = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/return-sub-reasons`, config(token))
            .then((res) => {
                dispatch(getReturnSubReasons(res.data.data.rows))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  return reasons
export const getSingleReturnReason = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/return-reasons/${id}`, config(token))
            .then((res) => {
                dispatch(getReturnReason(res.data.data.rows));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};


// find  product categories
export const loadReturnSubReasonsById = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/return-sub-reasons/search/${id}`, config(token))
            .then((res) => {
                dispatch(getReturnSubReasonsById(res.data.data.rows));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};