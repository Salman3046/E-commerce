import * as types from '../Constants/index';
import axios from 'axios';

const getFaqs = (faqs) => ({
    type: types.GET_FAQS,
    payload: faqs,
});

const getAllFaqs = (allFaqs) => ({
    type: types.GET_ALL_FAQS,
    payload: allFaqs,
});

const faqAdded = () => ({
    type: types.ADD_FAQ,
});

const faqDeleted = () => ({
    type: types.DELETE_FAQ,
})

const getFaq = (productAttribute) => ({
    type: types.GET_SINGLE_FAQ,
    payload: productAttribute,
})

const faqUpdated = () => ({
    type: types.UPDATE_FAQ,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all faqs
export const loadFaqs = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/faq`, config(token))
            .then((res) => {
                dispatch(getFaqs(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all faqs
export const loadAllFaqs = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/faq/all`, config(token))
            .then((res) => {
                dispatch(getAllFaqs(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete faqs

export const deleteFaq = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/faq/${id}`, config(token))
            .then((res) => {
                dispatch(faqDeleted(res.data.data));
                dispatch(loadFaqs(token));
                dispatch(loadAllFaqs(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add faqs
export const addFaq = (faq, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/faq/`, faq, config(token))
            .then((res) => {
                dispatch(faqAdded(res.data.data));
                dispatch(loadFaqs(token));
                dispatch(loadAllFaqs(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  faqs
export const getSingleFaq = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/faq/${id}`, config(token))
            .then((res) => {
                dispatch(getFaq(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update faqs
export const updateFaq = (faq, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/faq/${id}`, faq, config(token))
            .then((res) => {
                dispatch(faqUpdated());
                dispatch(loadFaqs(token));
                dispatch(loadAllFaqs(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};