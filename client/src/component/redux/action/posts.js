import {
   GET_POSTS,
   CREATE_POST,
   POSTS_LOADING,
   GET_INIT_POSTS,
   UPDATE_LIKES,
   GET_POST,
   COMMENT_POST,
   LIKE_UPDATE,
   INFINIT_POSTS,
   DELETE_POST,
} from '../action/type';
import axios from 'axios';
import { setAlert, setSnack } from './alerts';
import { CLEAR_POSTS } from './type';

export const getPosts = (cnt = 1) => async (dispatch) => {
   try {
      // dispatch({
      //    type: POSTS_LOADING,
      // });
      const res = await axios.get(`/api/posts?p=${cnt}`);
      dispatch({
         type: GET_POSTS,
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
export const getInfinitPosts = (cnt = 1) => async (dispatch) => {
   try {
      // dispatch({
      //    type: POSTS_LOADING,
      // });
      const res = await axios.get(`/api/posts?p=${cnt}`);
      dispatch({
         type: INFINIT_POSTS,
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
export const getInitPosts = (cnt = 1) => async (dispatch) => {
   try {
      // dispatch({
      //    type: POSTS_LOADING,
      // });
      const res = await axios.get(`/api/posts?p=1`);
      dispatch({
         type: GET_INIT_POSTS,
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

export const deletePost = (postId) => async (dispatch) => {
   const res = await axios.delete(`/api/posts/${postId}`);
   dispatch({
      type: DELETE_POST,
      payload: postId,
   });
   dispatch(setSnack('Post Deleted', 'success'));
};
export const clearPosts = () => async (dispatch) => {
   dispatch({
      type: CLEAR_POSTS,
   });
};
export const getPostById = (id) => async (dispatch) => {
   try {
      // dispatch({
      //    type: POSTS_LOADING,
      // });
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
         type: GET_POST,
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

export const unlikePost = (postId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      dispatch({
         type: UPDATE_LIKES,
         payload: { id: postId, data: res.data },
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const likePost = (postId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      dispatch({
         type: UPDATE_LIKES,
         payload: { id: postId, data: res.data },
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const unlikeAPost = (postId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      dispatch({
         type: LIKE_UPDATE,
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
export const likeAPost = (postId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
         type: LIKE_UPDATE,
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

export const createPost = (
   formdata,
   { clearInput, toggleCreatePost, histroy }
) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      let res = await axios.post('/api/posts/', formdata, config);
      // dispatch({
      //    type: CREATE_POST,
      //    payload: res.data,
      // });
      res = await axios.get(`/api/posts?p=${1}`);
      dispatch({
         type: GET_INIT_POSTS,
         payload: res.data,
      });
      if (toggleCreatePost) {
         toggleCreatePost();
         // const res = await axios.get(`/api/posts?p=${1}`);
         // dispatch({
         //    type: GET_INIT_POSTS,
         //    payload: res.data,
         // });
      }
      if (clearInput) clearInput();
      if (histroy) histroy.push('/posts');
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const commentPost = (id, formdata, callback) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const res = await axios.put(`/api/posts/comment/${id}`, formdata, config);

      dispatch({
         type: COMMENT_POST,
         payload: res.data,
      });
      if (callback) callback();
      dispatch(setSnack('Comment posted', 'success'));
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
