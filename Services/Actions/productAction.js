import * as types from '../Constants/index';
import axios from 'axios';

const getProducts = (products) => ({
    type: types.GET_PRODUCTS,
    payload: products,
});

const getAllProducts = (allProducts) => ({
    type: types.GET_ALL_PRODUCTS,
    payload: allProducts,
});

const getAllProductsByCategory = (allProductsByCategory) => ({
    type: types.GET_PRODUCTS_BY_CATEGORY,
    payload: allProductsByCategory,
});

const getAllProductsBySubcategory = (allProductsBySubcategory) => ({
    type: types.GET_PRODUCTS_BY_SUBCATEGORY,
    payload: allProductsBySubcategory,
});

const getAllProductsByBrand = (allProductsByBrand) => ({
    type: types.GET_PRODUCTS_BY_BRAND,
    payload: allProductsByBrand,
});

const getFeaturedProducts = (featuredProducts) => ({
    type: types.GET_FEATURED_PRODUCTS,
    payload: featuredProducts,
});

const getNewArrivalProducts = (newArrivalProducts) => ({
    type: types.GET_NEW_ARRIVAL_PRODUCTS,
    payload: newArrivalProducts,
});

const getSimilarProducts = (similarProducts) => ({
    type: types.GET_SIMILAR_PRODUCTS,
    payload: similarProducts,
});

const productAdded = () => ({
    type: types.ADD_PRODUCT,
});

const productDeleted = () => ({
    type: types.DELETE_PRODUCT,
})

const getProduct = (product) => ({
    type: types.GET_SINGLE_PRODUCT,
    payload: product,
})

const productUpdated = () => ({
    type: types.UPDATE_PRODUCT,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all product
export const loadProducts = (size,token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/products/getProducts`,size, config(token))
            .then((res) => {
                dispatch(getProducts(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all products by category id
export const loadAllProductsByCategory = (id) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/products/search/category/${id}`)
            .then((res) => {
                dispatch(getAllProductsByCategory(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all products by subcategory id
export const loadAllProductsBySubcategory = (id) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/products/search/subCategory/${id}`)
            .then((res) => {
                dispatch(getAllProductsBySubcategory(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all products by brand id
export const loadAllProductsByBrand = (id) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/products/search/brand/${id}`)
            .then((res) => {
                dispatch(getAllProductsByBrand(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all product
export const loadAllProducts = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/products/all`, config(token))
            .then((res) => {
                dispatch(getAllProducts(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all products where featured status is true
export const loadFeaturedProducts = (pageSize) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/products/featured`,pageSize)
            .then((res) => {
                dispatch(getFeaturedProducts(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all new arrival products
export const loadNewArrivalProducts = (pageSize) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/products/newArrival`,pageSize)
            .then((res) => {
                dispatch(getNewArrivalProducts(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// get all similar products
export const loadSimilarProducts = (id) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/products/similarProducts/${id}`)
            .then((res) => {
                dispatch(getSimilarProducts(res.data.data))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// delete product

export const deleteProduct = (id, token) => {
    return function (dispatch) {
        axios.delete(`${import.meta.env.VITE_IP_URL}/api/products/${id}`, config(token))
            .then((res) => {
                dispatch(productDeleted(res.data.data));
                dispatch(loadProducts(token));
                dispatch(loadAllProducts(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// add product 
export const addProduct = (product, token) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/products/`, product, config(token))
            .then((res) => {
                dispatch(productAdded(res.data.data));
                dispatch(loadAllProducts(token));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  product
export const getSingleProduct = (id, token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/products/${id}`, config(token))
            .then((res) => {
                dispatch(getProduct(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// update product 
export const updateProduct = (product, id, token) => {
    return function (dispatch) {
        console.log(product)
        axios.patch(`${import.meta.env.VITE_IP_URL}/api/products/${id}`, product, config(token))
            .then((res) => {
                console.log(res.data)
                dispatch(productUpdated());
            })
            .catch((error) => {
                console.log(error);
            })
    };
};