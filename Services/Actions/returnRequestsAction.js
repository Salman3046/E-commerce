import * as types from '../Constants/index';
import axios from 'axios';

const getReturnRequests= (returnRequests) => ({
    type: types.GET_RETURN_REQUESTS,
    payload: returnRequests,
});
const getReturnRequest = (returnRequest) => ({
    type: types.GET_SINGLE_RETURN_REQUESTS,
    payload: returnRequest,
})

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all return requests
export const loadReturnRequests = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/return-requests`, config(token))
            .then((res) => {

                dispatch(getReturnRequests(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  return request
export const getSingleReturnRequest = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/return-requests/${id}`, config(token))
            .then((res) => {
                dispatch(getReturnRequest(res.data.data.rows));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};


// update return request
export const updateReturnRequest = (changes, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/return-requests/${id}`, changes, config(token))
            .then((res) => {
                dispatch(loadReturnRequests(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};