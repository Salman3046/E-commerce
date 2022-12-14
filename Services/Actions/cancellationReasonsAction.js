import * as types from '../Constants/index';
import axios from 'axios';

const getCancellationReasonsReducer = (cancellationReasons) => ({
    type: types.GET_CANCELLATION_REASONS,
    payload: cancellationReasons,
});

const config = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}

// get all coupon
export const loadCancellationReasons = (token) => {
    return function (dispatch) {
        axios.get(`${import.meta.env.VITE_IP_URL}/api/cancellation-reasons`, config(token))
            .then((res) => {
                dispatch(getCancellationReasonsReducer(res.data.data.rows))
            })
            .catch((error) => {
                console.log(error);
            })
    };
};
