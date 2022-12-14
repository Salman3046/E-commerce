import * as types from '../Constants/index';
import axios from 'axios';

const getUserProfile = (userProfile) => ({
    type: types.GET_PROFILE_BY_ID,
    payload: userProfile,
})


const userProfileUpdated = () => ({
    type: types.UPDATE_PROFILE_BY_ID,
});

const config=(token)=>{
    return {headers: { Authorization: `Bearer ${token}` }}
}

// get user profile
export const loadUserProfile = (token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/profile/get_profile`,{},config(token))
            .then((res) => {
                dispatch(getUserProfile(res.data.data.rows))
            })
            .catch((error) => {
                dispatch(getUserProfile(error.response.data.data))
            })
    };
};


// update user's profile
export const updateUserProfile = (changes,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/profile/update_profile/`,changes,config(token))
            .then((res) => {
                dispatch(userProfileUpdated());
                dispatch(loadUserProfile(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
