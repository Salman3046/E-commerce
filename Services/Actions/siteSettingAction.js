import * as types from '../Constants/index';
import axios from 'axios';

const getSiteSettings = (siteSettings) => ({
    type: types.GET_SITE_SETTINGS,
    payload: siteSettings,
});

const siteSettingsUpdated = () => ({
    type: types.UPDATE_SITE_SETTING,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all site settings
export const loadSiteSettings = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/site_settings`, config(token))
            .then((res) => {
                dispatch(getSiteSettings(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update site settings
export const updateSiteSettings = (settings, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/site_settings/${id}`, settings, config(token))
            .then((res) => {
                dispatch(siteSettingsUpdated());
                dispatch(loadSiteSettings(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};