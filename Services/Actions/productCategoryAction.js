import * as types from '../Constants/index';
import axios from 'axios';

const getProductCategories = (productCategories) => ({
    type: types.GET_PRODUCT_CATEGORYS,
    payload: productCategories,
});

const getAllProductCategories = (allProductCategories) => ({
    type: types.GET_ALL_PRODUCT_CATEGORYS,
    payload: allProductCategories,
});

const productCategoryAdded = () => ({
    type: types.ADD_PRODUCT_CATEGORY,
});

const productCategoryDeleted = () => ({
    type: types.DELETE_PRODUCT_CATEGORY,
})

const getProductCategory = (productCategory) => ({
    type: types.GET_SINGLE_PRODUCT_CATEGORY,
    payload: productCategory,
})

const productCategoryUpdated = () => ({
    type: types.UPDATE_PRODUCT_CATEGORY,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all produuct categories
export const loadProductCategories = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_category`, config(token))
            .then((res) => {
                dispatch(getProductCategories(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all produuct categories
export const loadAllProductCategories = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_category/all`, config(token))
            .then((res) => {
                dispatch(getAllProductCategories(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete produuct categories

export const deleteProductCategory = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/product_category/${id}`, config(token))
            .then((res) => {
                dispatch(productCategoryDeleted(res.data.data));
                dispatch(loadAllProductCategories(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add product categories
export const addProductCategory = (category, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/product_category/`, category, config(token))
            .then((res) => {
                dispatch(productCategoryAdded(res.data.data));
                dispatch(loadAllProductCategories(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  produuct categories
export const getSingleProductCategory = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_category/${id}`, config(token))
            .then((res) => {
                dispatch(getProductCategory(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update product category
export const updateProductCategory = (category, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/product_category/${id}`, category, config(token))
            .then((res) => {
                dispatch(productCategoryUpdated());
                dispatch(loadAllProductCategories(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};