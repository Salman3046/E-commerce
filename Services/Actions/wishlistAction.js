import * as types from '../Constants/index';
import axios from 'axios';
import { loadProducts } from './productAction';

const getWishlistByUserId = (wishlistByUserId) => ({
    type: types.GET_WISHLIST_BY_USERID,
    payload: wishlistByUserId,
})

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all user's wishlist data
export const loadUserWishlist = (size,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/wishlist/user`,size, config(token))
            .then((res) => {
                dispatch(getWishlistByUserId(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};


// add to wishlist
export const addToWishlist = (product_id, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/wishlist/`, { product_id: product_id }, config(token))
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    };
};


// remove from wishlist
export const removeFromWishlist = (product_id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/wishlist/${product_id}`, config(token))
            .then((res) => {
               console.log(res)
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
