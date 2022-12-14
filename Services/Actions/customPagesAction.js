import * as types from '../Constants/index';
import axios from 'axios';

const getAboutPage = (aboutPage) => ({
    type: types.GET_ABOUT_PAGE,
    payload: aboutPage,
});

const aboutPageUpdated = () => ({
    type: types.UPDATE_ABOUT_PAGE,
});

const getPrivacyPage = (privacyPage) => ({
    type: types.GET_PRIVACY_PAGE,
    payload: privacyPage,
});

const privacyPageUpdated = () => ({
    type: types.UPDATE_PRIVACY_PAGE,
});

const getRefundPage = (refundPage) => ({
    type: types.GET_REFUND_PAGE,
    payload: refundPage,
});

const refundPageUpdated = () => ({
    type: types.UPDATE_REFUND_PAGE,
});

const getTermsPage = (termsPage) => ({
    type: types.GET_TERMS_PAGE,
    payload: termsPage,
});

const termsPageUpdated = () => ({
    type: types.UPDATE_TERMS_PAGE,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get about page
export const loadAboutPage = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/custom_pages/about`, config(token))
            .then((res) => {
                dispatch(getAboutPage(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update about page
export const updateAboutPage = (page, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/custom_pages/about/${id}`, page, config(token))
            .then((res) => {
                console.log(res.data)
                dispatch(aboutPageUpdated());
                dispatch(loadAboutPage(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get privacy page
export const loadPrivacyPage = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/custom_pages/privacy`, config(token))
            .then((res) => {
                dispatch(getPrivacyPage(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update privacy page
export const updatePrivacyPage = (page, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/custom_pages/privacy/${id}`, page, config(token))
            .then((res) => {
                dispatch(privacyPageUpdated());
                dispatch(loadPrivacyPage(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get refund page
export const loadRefundPage = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/custom_pages/refund`, config(token))
            .then((res) => {
                dispatch(getRefundPage(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update refund page
export const updateRefundPage = (page, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/custom_pages/refund/${id}`, page, config(token))
            .then((res) => {
                dispatch(refundPageUpdated());
                dispatch(loadRefundPage(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get terms page
export const loadTermsPage = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/custom_pages/terms`, config(token))
            .then((res) => {
                dispatch(getTermsPage(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update terms page
export const updateTermsPage = (page, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/custom_pages/terms/${id}`, page, config(token))
            .then((res) => {
                dispatch(termsPageUpdated());
                dispatch(loadTermsPage(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};