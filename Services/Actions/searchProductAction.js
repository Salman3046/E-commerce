import * as types from '../Constants/index';
import axios from 'axios';

const getSearchProduct = (searchedProducts) => ({
    type: types.GET_SEARCHED_PRODUCTS,
    payload: searchedProducts,
});

// add order
export const loadSearchProduct = (search) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/search/product`, search)
            .then((res) => {
                dispatch(getSearchProduct(res.data?.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

