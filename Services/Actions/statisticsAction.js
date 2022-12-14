import * as types from "../Constants/index";
import axios from "axios";

const getStatistics = (statistics) => ({
  type: types.GET_STATISTICS,
  payload: statistics,
});

const config = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// get all statistics
export const loadStatistics = (token) => {
  return function (dispatch) {
    axios
      .get(`${import.meta.env.VITE_IP_URL}/api/statistics`, config(token))
      .then((res) => {
        dispatch(getStatistics(res.data.data.rows));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
