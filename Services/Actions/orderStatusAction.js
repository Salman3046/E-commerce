import * as types from '../Constants/index';
import axios from 'axios';

const getOrderStatus = (orderStatus) => ({
    type: types.GET_ORDER_STATUS,
    payload: orderStatus,
});


const getOrderStatusLogs = (orderStatusLogs) => ({
    type: types.GET_ORDER_STATUS_LOGS,
    payload: orderStatusLogs,
});


const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all order status
export const loadOrderStatus = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/order-status`, config(token))
            .then((res) => {
                dispatch(getOrderStatus(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all order status
export const loadOrderStatusLogs = (orderId,token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/order-status-logs/${orderId}`, config(token))
            .then((res) => {
                dispatch(getOrderStatusLogs(res.data.data.rows))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add order status logs
export const addOrderStatusLogs = (log,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/order-status-logs`,log, config(token))
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    };
};