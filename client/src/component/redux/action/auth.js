import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   GETUSER_SUCCESS,
   GETUSER_FAIL,
   LOGOUT_USER,
   CLEAR_PROFILE,
   UPDATE_ICON,
   CLEAR_WALL,
} from '../action/type';

import axios from 'axios';
import setToken from '../../util/setToken';
import { setSnack, setAlert } from './alerts';
import { getMyProfile } from './profiles';

export const regsterUser = ({ name, email, password }) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const body = JSON.stringify({ name, email, password });
      const res = await axios.post('/api/users', body, config);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });
      dispatch(loadUser());
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
      dispatch({
         type: REGISTER_FAIL,
      });
   }
};
export const loginUser = ({ email, password }) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post('/api/auth', body, config);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });
      dispatch(loadUser());
      dispatch(setSnack('Sign in Sucessfully', 'success'));
   } catch (error) {
      dispatch({
         type: LOGIN_FAIL,
      });
   }
};
export const updateIcon = (formData, callback) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      };
      const res = await axios.put('/api/users/avatar', formData, config);
      dispatch({
         type: UPDATE_ICON,
         payload: res.data,
      });
      if (callback) callback();
   } catch (error) {}
};
export const loadUser = () => async (dispatch) => {
   try {
      setToken(localStorage.getItem('token'));
      const res = await axios.get('/api/auth');
      dispatch({
         type: GETUSER_SUCCESS,
         payload: res.data,
      });
      dispatch(getMyProfile());
   } catch (error) {
      dispatch({
         type: GETUSER_FAIL,
      });
   }
};

export const logout = (history) => async (dispatch) => {
   dispatch({
      type: LOGOUT_USER,
   });
   dispatch({
      type: CLEAR_PROFILE,
   });
   dispatch({
      type: CLEAR_WALL,
   });
   setToken();
   dispatch(setSnack('Sign out Sucessfully', 'success'));
   history.push('/');
};
