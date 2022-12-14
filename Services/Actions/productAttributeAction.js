import * as types from '../Constants/index';
import axios from 'axios';

const getProductAttributes = (productAttributes) => ({
    type: types.GET_PRODUCT_ATTRIBUTES,
    payload: productAttributes,
});

const getAllProductAttributes = (allProductAttributes) => ({
    type: types.GET_ALL_PRODUCT_ATTRIBUTES,
    payload: allProductAttributes,
});

const productAttributeAdded = () => ({
    type: types.ADD_PRODUCT_ATTRIBUTE,
});

const productAttributeDeleted = () => ({
    type: types.DELETE_PRODUCT_ATTRIBUTE,
})

const getProductAttribute = (productAttribute) => ({
    type: types.GET_SINGLE_PRODUCT_ATTRIBUTE,
    payload: productAttribute,
})

const productAttributeUpdated = () => ({
    type: types.UPDATE_PRODUCT_ATTRIBUTE,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all product attribute
export const loadProductAttributes = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_attribute`, config(token))
            .then((res) => {
                dispatch(getProductAttributes(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all product attribute
export const loadAllProductAttributes = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_attribute/all`, config(token))
            .then((res) => {
                dispatch(getAllProductAttributes(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete product attribute

export const deleteProductAttribute = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/product_attribute/${id}`, config(token))
            .then((res) => {
                dispatch(productAttributeDeleted(res.data.data));
                dispatch(loadProductAttributes(token));
                dispatch(loadAllProductAttributes(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add product attribute
export const addProductAttribute = (attribute, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/product_attribute/`, attribute, config(token))
            .then((res) => {
                dispatch(productAttributeAdded(res.data.data));
                dispatch(loadProductAttributes(token));
                dispatch(loadAllProductAttributes(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  product attribute
export const getSingleProductAttribute = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_attribute/${id}`, config(token))
            .then((res) => {
                dispatch(getProductAttribute(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update product attribute
export const updateProductAttribute = (attribute, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/product_attribute/${id}`, attribute, config(token))
            .then((res) => {
                dispatch(productAttributeUpdated());
                dispatch(loadProductAttributes(token));
                dispatch(loadAllProductAttributes(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};