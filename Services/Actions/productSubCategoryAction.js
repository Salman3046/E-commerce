import * as types from "../Constants/index";
import axios from "axios";

const getProductSubCategories = (productSubCategories) => ({
  type: types.GET_PRODUCT_SUB_CATEGORYS,
  payload: productSubCategories,
});

const getAllProductSubCategories = (allProductSubCategories) => ({
  type: types.GET_ALL_PRODUCT_SUB_CATEGORYS,
  payload: allProductSubCategories,
});

const productSubCategoryAdded = () => ({
  type: types.ADD_PRODUCT_SUB_CATEGORY,
});

const productSubCategoryDeleted = () => ({
  type: types.DELETE_PRODUCT_SUB_CATEGORY,
});

const getProductSubCategory = (productSubCategory) => ({
  type: types.GET_SINGLE_PRODUCT_SUB_CATEGORY,
  payload: productSubCategory,
});

const productSubCategoryUpdated = () => ({
  type: types.UPDATE_PRODUCT_SUB_CATEGORY,
});

const config = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// get all product sub categories
export const loadProductSubCategories = (token) => {
  return function (dispatch) {
    axios
      .get(
        `${import.meta.env.VITE_IP_URL}/api/product_sub_category`,
        config(token)
      )
      .then((res) => {
        dispatch(getProductSubCategories(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// get all product sub categories
export const loadAllProductSubCategories = (token) => {
  return function (dispatch) {
    axios
      .get(
        `${import.meta.env.VITE_IP_URL}/api/product_sub_category/all`,
        config(token)
      )
      .then((res) => {
        dispatch(getAllProductSubCategories(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// delete product sub categories

export const deleteProductSubCategory = (id, token) => {
  return function (dispatch) {
    axios
      .delete(
        `${import.meta.env.VITE_IP_URL}/api/product_sub_category/${id}`,
        config(token)
      )
      .then((res) => {
        dispatch(productSubCategoryDeleted(res.data.data));
        dispatch(loadAllProductSubCategories(token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// add product sub categories
export const addProductSubCategory = (subCategory, token) => {
  return function (dispatch) {
    axios
      .post(
        `${import.meta.env.VITE_IP_URL}/api/product_sub_category/`,
        subCategory,
        config(token)
      )
      .then((res) => {
        dispatch(productSubCategoryAdded(res.data.data));
        dispatch(loadAllProductSubCategories(token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// find  product sub categories
export const getSingleProductSubCategory = (id, token) => {
  return function (dispatch) {
    axios
      .get(
        `${import.meta.env.VITE_IP_URL}/api/product_sub_category/${id}`,
        config(token)
      )
      .then((res) => {
        dispatch(getProductSubCategory(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// update product sub category
export const updateProductSubCategory = (subCategory, id, token) => {
  return function (dispatch) {
    axios
      .patch(
        `${import.meta.env.VITE_IP_URL}/api/product_sub_category/${id}`,
        subCategory,
        config(token)
      )
      .then((res) => {
        dispatch(productSubCategoryUpdated());
        dispatch(loadAllProductSubCategories(token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
