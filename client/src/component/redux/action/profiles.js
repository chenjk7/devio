import {
   GET_PROFILE,
   GET_MYPROFILE,
   GET_PROFILES,
   CREATE_PROFILE,
   UPDATE_PROFILE,
   CLEAR_PROFILE,
   UPDATE_COVER,
   PROFILE_LOADING,
   INFINIT_PROFILES,
   UPDATE_FOLLOW,
} from '../action/type';
import axios from 'axios';
import { setAlert, setSnack } from './alerts';
import setToken from '../../util/setToken';
export const getProfiles = (cnt = 1) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profile?p=${cnt}`);
      dispatch({
         type: GET_PROFILES,
         payload: res.data,
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const getInfinitProfiles = (cnt = 1) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profile?p=${cnt}`);
      dispatch({
         type: INFINIT_PROFILES,
         payload: res.data,
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};

export const getMyProfile = () => async (dispatch) => {
   try {
      setToken(localStorage.getItem('token'));
      const res = await axios.get('/api/profile/me');
      dispatch({
         type: GET_MYPROFILE,
         payload: res.data,
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const getProfileById = (id) => async (dispatch) => {
   try {
      dispatch({
         type: PROFILE_LOADING,
      });

      const res = await axios.get(`/api/profile/user/${id}`);
      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      });
   } catch (error) {
      dispatch({
         type: CLEAR_PROFILE,
      });
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const followUser = (userId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/profile/follow/${userId}`);
      dispatch({
         type: UPDATE_FOLLOW,
         payload: res.data,
      });
      dispatch(setSnack('Developer is now following', 'success'));
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const unfollowUser = (userId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/profile/unfollow/${userId}`);
      dispatch({
         type: UPDATE_FOLLOW,
         payload: res.data,
      });
      dispatch(setSnack('Developer is unfollowed', 'success'));
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const addExperience = (formData, callback) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const res = await axios.put('/api/profile/experience', formData, config);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });

      callback();
   } catch (error) {
      if (error.response && error.response.data) {
         error.response.data.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const addEducation = (formData, callback) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      const res = await axios.put('/api/profile/education', formData, config);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });

      callback();
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const deleteExperience = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });
   } catch (error) {
      if (error.response && error.response.data) {
         error.response.data.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};

export const deleteEducation = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const updateCover = (formData, callback) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      };
      const res = await axios.put('/api/profile/cover', formData, config);
      dispatch({
         type: UPDATE_COVER,
         payload: res.data,
      });
      if (callback) callback();
   } catch (error) {}
};
export const createProfile = (
   formData,
   redirect = false,
   history = null,
   edit = false,
   callback
) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const body = JSON.stringify({
         ...formData,
         skills: formData.skills.join(','),
      });

      const res = await axios.post('/api/profile', body, config);
      dispatch({
         type: CREATE_PROFILE,
         payload: res.data,
      });
      if (!edit) {
         dispatch(setSnack('Profile Created', 'success'));
      } else {
         dispatch(setSnack('Profile Updated', 'success'));
      }
      if (callback) callback();
      if (redirect && history) {
         history.push('/dashboard');
      }
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
            if (edit) {
               dispatch(setSnack(err.msg, 'error'));
            }
         });
      }
   }
};
