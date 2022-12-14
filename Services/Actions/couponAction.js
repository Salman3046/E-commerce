import * as types from '../Constants/index';
import axios from 'axios';

const getCoupons = (coupons) => ({
    type: types.GET_COUPONS,
    payload: coupons,
});

const getAllCoupons = (allCoupons) => ({
    type: types.GET_ALL_COUPONS,
    payload: allCoupons,
});

const couponAdded = () => ({
    type: types.ADD_COUPON,
});

const couponDeleted = () => ({
    type: types.DELETE_COUPON,
})

const getCoupon = (coupon) => ({
    type: types.GET_SINGLE_COUPON,
    payload: coupon,
})

const couponUpdated = () => ({
    type: types.UPDATE_COUPON,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all coupon
export const loadCoupons = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/coupons`, config(token))
            .then((res) => {
                dispatch(getCoupons(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all coupon
export const loadAllCoupons = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/coupons/all`, config(token))
            .then((res) => {
                dispatch(getAllCoupons(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete coupon

export const deleteCoupon = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/coupons/${id}`, config(token))
            .then((res) => {
                dispatch(couponDeleted(res.data.data));
                dispatch(loadCoupons(token));
                dispatch(loadAllCoupons(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add coupon
export const addCoupon = (brand, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/coupons/`, brand, config(token))
            .then((res) => {
                dispatch(couponAdded(res.data.data));
                dispatch(loadCoupons(token));
                dispatch(loadAllCoupons(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  coupon
export const getSingleCoupon = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/coupons/${id}`, config(token))
            .then((res) => {
                dispatch(getCoupon(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update coupon
export const updateCoupon = (brand, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/coupons/${id}`, brand, config(token))
            .then((res) => {
                dispatch(couponUpdated());
                dispatch(loadCoupons(token));
                dispatch(loadAllCoupons(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};