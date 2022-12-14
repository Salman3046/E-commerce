import * as types from '../Constants/index';
import axios from 'axios';

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const userAdded = () => ({
    type: types.ADD_USER,
});

const userDeleted = () => ({
    type: types.DELETE_USER,
})

const getuser = (user) => ({
    type: types.GET_SINGLE_USER,
    payload: user,
})

const userUpdated = () => ({
    type: types.UPDATE_USER,
});

const config=(token)=>{
    return {headers: { Authorization: `Bearer ${token}` }}
}

// get all user
export const loadUsers = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/user`,config(token))
            .then((res) => {
                dispatch(getUsers(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete user

export const deleteUser = (id,token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/user/${id}`,config(token))
            .then((res) => {
                dispatch(userDeleted(res.data.data));
                dispatch(loadUsers(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add user
export const addUser = (user,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/user/`, user,config(token))
            .then((res) => {
                dispatch(userAdded(res.data?.data?.rows));
                dispatch(loadUsers(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  user
export const getSingleUser = (id,token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/user/${id}`,config(token))
            .then((res) => {
                dispatch(getuser(res.data?.data?.rows));
            })
            .catch((error) => {
                dispatch(getuser(error?.response?.data?.data));
            })
    };
};

// update user
export const updateUser = (changes, id,token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/user/${id}`, changes,config(token))
            .then((res) => {
                dispatch(userUpdated());
                dispatch(loadUsers(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};