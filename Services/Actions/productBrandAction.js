import * as types from '../Constants/index';
import axios from 'axios';

const getProductBrands = (productBrands) => ({
    type: types.GET_PRODUCT_BRANDS,
    payload: productBrands,
});

const getAllProductBrands = (allProductBrands) => ({
    type: types.GET_ALL_PRODUCT_BRANDS,
    payload: allProductBrands,
});

const productBrandAdded = () => ({
    type: types.ADD_PRODUCT_BRAND,
});

const productBrandDeleted = () => ({
    type: types.DELETE_PRODUCT_BRAND,
})

const getProductBrand = (productBrand) => ({
    type: types.GET_SINGLE_PRODUCT_BRAND,
    payload: productBrand,
})

const productBrandUpdated = () => ({
    type: types.UPDATE_PRODUCT_BRAND,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all product brand
export const loadProductBrands = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_brand`, config(token))
            .then((res) => {
                dispatch(getProductBrands(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all product brand
export const loadAllProductBrands = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_brand/all`, config(token))
            .then((res) => {
                dispatch(getAllProductBrands(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete product brand

export const deleteProductBrand = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/product_brand/${id}`, config(token))
            .then((res) => {
                dispatch(productBrandDeleted(res.data.data));
                dispatch(loadProductBrands(token));
                dispatch(loadAllProductBrands(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add product brand
export const addProductBrand = (brand, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/product_brand/`, brand, config(token))
            .then((res) => {
                dispatch(productBrandAdded(res.data.data));
                dispatch(loadProductBrands(token));
                dispatch(loadAllProductBrands(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  product brand
export const getSingleProductBrand = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/product_brand/${id}`, config(token))
            .then((res) => {
                dispatch(getProductBrand(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update product brand
export const updateProductBrand = (brand, id, token) => {
    return function (dispatch) {
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/product_brand/${id}`, brand, config(token))
            .then((res) => {
                dispatch(productBrandUpdated());
                dispatch(loadProductBrands(token));
                dispatch(loadAllProductBrands(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};