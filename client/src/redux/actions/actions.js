// export const action = () => async (dispatch) => {}
import axios from "axios";
import { GET_JOBS, GET_USERNAME, GET_USERS, POST_USER } from "./actions_vars"

export function getUsers() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/users")
      .then((u) => {
        dispatch({
          type: GET_USERS,
          payload: u.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getUsersName(search) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/users?name=" + search)
      .then((u) => {
        dispatch({
          type: GET_USERNAME,
          payload: u.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createUser(payload) {
  return async function (dispatch) {
    const user = await axios.post("http://localhost:3001/users", payload);
    dispatch({
      type: POST_USER,
    });
    return user;
  };
}

export function getJobs() {
  return async function (dispatch) {
    try {
      let jobs = await axios.get("http://localhost:3001/jobs");
      return dispatch({ type: GET_JOBS, payload: jobs.data });
    } catch (error) {
      console.log(error);
    }
  };
}
