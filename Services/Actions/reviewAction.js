import * as types from '../Constants/index';
import axios from 'axios';

const getReviewsByProductId = (reviewsByProductId) => ({
    type: types.GET_REVIEWS_BY_PRODUCT_ID,
    payload: reviewsByProductId,
});

const reviewAdded = () => ({
    type: types.ADD_REVIEW,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// add review
export const addReview = (review, token) => {
    console.log(review)
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/review/`, review, config(token))
            .then((res) => {
                dispatch(reviewAdded(res.data?.data?.rows));
                dispatch(getReviewByProductId({product_id:review.product_id,pageSize:4,pageIndex:1}));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};

// find  review by product id
export const getReviewByProductId = (size) => {
    return function (dispatch) {
        axios.post(`${import.meta.env.VITE_IP_URL}/api/review/getProductReview/`,size)
            .then((res) => {
                dispatch(getReviewsByProductId(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
