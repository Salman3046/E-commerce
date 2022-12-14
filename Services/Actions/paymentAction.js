import * as types from '../Constants/index';
import axios from 'axios';

const getPayments = (payments) => ({
    type: types.GET_PAYMENTS,
    payload: payments,
});

const getAllPayments = (allPayments) => ({
    type: types.GET_ALL_PAYMENTS,
    payload: allPayments,
});

const getPayment = (payment) => ({
    type: types.GET_SINGLE_PAYMENT,
    payload: payment,
})

const paymentUpdated = () => ({
    type: types.UPDATE_PAYMENT,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all payments
export const loadPayments = () => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/payments`)
            .then((res) => {
                dispatch(getPayments(res.data.data.rows))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all payments
export const loadAllPayments = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/payments/all`, config(token))
            .then((res) => {
                dispatch(getAllPayments(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  payments
export const getSinglePayment = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/payments/${id}`, config(token))
            .then((res) => {
                dispatch(getPayment(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update payments
export const updatePayment = (payment, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/payments/${id}`, payment, config(token))
            .then((res) => {
                dispatch(paymentUpdated());
                dispatch(loadPayments(token));
                dispatch(loadAllPayments(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};