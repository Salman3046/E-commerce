import * as types from '../Constants/index';
import axios from 'axios';
import { getCartData } from './cartAction';

const getOrders = (orders) => ({
    type: types.GET_ORDERS,
    payload: orders,
});

const getOrdersById = (ordersByUser) => ({
    type: types.GET_ORDERS_BY_USER_ID,
    payload: ordersByUser,
});

const orderAdded = () => ({
    type: types.ADD_ORDER,
});

const getOrder = (order) => ({
    type: types.GET_SINGLE_ORDER,
    payload: order,
})

const orderUpdated = () => ({
    type: types.UPDATE_ORDER,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all order
export const loadOrders = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/orders`, config(token))
            .then((res) => {
                dispatch(getOrders(res.data.data))
                
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add order
export const addOrder = (order, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/orders/`, order, config(token))
            .then((res) => {
                dispatch(orderAdded(res.data?.data?.rows));
                dispatch(getOrdersByUser({pageSize:2,pageIndex:1},token));
                dispatch(getCartData())
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  order
export const getSingleOrder = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/orders/${id}`, config(token))
            .then((res) => {
                dispatch(getOrder(res.data?.data?.rows));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  order by user id
export const getOrdersByUser = (order,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/orders/user/getOrders/`,order, config(token))
            .then((res) => {
                dispatch(getOrdersById(res.data?.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update order
export const updateOrder = (changes, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/orders/${id}`, changes, config(token))
            .then((res) => {
                dispatch(orderUpdated());
            })
            .catch((error) => {
                console.log(error);
            })
    };
};