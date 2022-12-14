import * as types from '../Constants/index';
import axios from 'axios';

const getUserAddresses = (userAddresses) => ({
    type: types.GET_USER_ADDRESSS,
    payload: userAddresses,
});

const getUserAddressById = (userAddressesById) => ({
    type: types.GET_USER_ADDRESSS_BY_USER_ID,
    payload: userAddressesById,
});

const userAddressAdded = () => ({
    type: types.ADD_USER_ADDRESS,
});

const userAddressDeleted = () => ({
    type: types.DELETE_USER_ADDRESS,
})

const getUserAddress = (userAddress) => ({
    type: types.GET_SINGLE_USER_ADDRESS,
    payload: userAddress,
})

const userAddressUpdated = () => ({
    type: types.UPDATE_USER_ADDRESS,
});

const config=(token)=>{
    return {headers: { Authorization: `Bearer ${token}` }}
}

// get all user address
export const loadUserAddress = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/user_address`,config(token))
            .then((res) => {
                dispatch(getUserAddresses(res.data.data.rows))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete user address
export const deleteUserAddress = (id,token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/user_address/${id}`,config(token))
            .then((res) => {
                dispatch(userAddressDeleted(res.data.data));
                dispatch(loadUserAddress(token));
                dispatch(getSingleUserAddressByUserId(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add user address
export const addUserAddress = (user,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/user_address/`, user,config(token))
            .then((res) => {
                dispatch(userAddressAdded(res.data?.data?.rows));
                dispatch(loadUserAddress(token));
                dispatch(getSingleUserAddressByUserId(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  user address
export const getSingleUserAddress = (id,token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/user_address/${id}`,config(token))
            .then((res) => {
                dispatch(getUserAddress(res.data?.data?.rows));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  user address by user id
export const getSingleUserAddressByUserId = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/user_address`,config(token))
            .then((res) => {
                dispatch(getUserAddressById(res.data?.data?.rows));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update user
export const updateUserAddress = (changes, id,token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/user_address/${id}`, changes,config(token))
            .then((res) => {
                dispatch(userAddressUpdated());
                dispatch(loadUserAddress(token));
                dispatch(getSingleUserAddressByUserId(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};