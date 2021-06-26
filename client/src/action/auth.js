import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';
//load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        }
        )
    } catch(err) {
      dispatch({
          type:AUTH_ERROR
      });
    }
}

//Register User
export const register = ({ name, email, password }) => async dispatch => {
    console.log("body.name:" + name);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name, email, password };

    try {
        const res = await axios.post('/api/user', body);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,

        });
    } catch (err) {
        //Get array of errors
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}