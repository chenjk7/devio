import {
   GET_WALL,
   INFINIT_WALL,
   CREATE_WALLPOST,
   GET_INIT_WALL,
   COMMENT_WALLPOST,
   UPDATE_WALLLIKES,
   WALLPOST_DELETED,
   DETECT_WALLPOSTS,
   CLEAR_DETECT_WALLPOSTS,
   DELETE_WALLPOST,
} from '../action/type';
import axios from 'axios';
import { setAlert, setSnack } from './alerts';
export const getInfinitWall = (id, cnt = 1, pageCount) => async (dispatch) => {
   try {
      // dispatch({
      //    type: POSTS_LOADING,
      // });

      const res = await axios.get(
         `/api/wall/${id}?p=${cnt}&limit=${pageCount}`
      );
      dispatch({
         type: INFINIT_WALL,
         payload: res.data,
      });
      if (res.data.isNewPosts) {
         dispatch({
            type: DETECT_WALLPOSTS,
         });
      }
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};

export const getInitialWall = (id, cnt = 1) => async (dispatch) => {
   try {
      // dispatch({
      //    type: POSTS_LOADING,
      // });

      const res = await axios.get(`/api/wall/${id}?p=${cnt}`);
      dispatch({
         type: GET_INIT_WALL,
         payload: res.data,
      });
      // if (res.data.isNewPosts) {
      //    dispatch({
      //       type: CLEAR_DETECT_WALLPOSTS,
      //    });
      // }
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const createWallPost = (formdata, id, clearText) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      let res = await axios.post(`/api/wall/${id}`, formdata, config);
      // res = await axios.get(`/api/wall/${id}?p=${1}`);
      // dispatch({
      //    type: GET_INIT_WALL,
      //    payload: res.data,
      // });
      dispatch({
         type: CREATE_WALLPOST,
         payload: res.data,
      });
      if (clearText) clearText();
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};

export const createWallPostComment = (
   formdata,
   wallId,
   postId,
   callback
) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };
      const res = await axios.put(
         `/api/wall/comment/${wallId}/${postId}`,
         formdata,
         config
      );

      dispatch({
         type: COMMENT_WALLPOST,
         payload: { wallId: wallId, postId: postId, data: res.data },
      });
      if (callback) callback();
      dispatch(setSnack('Comment posted', 'success'));
   } catch (error) {
      if (error.response && error.response.statusText == 'Unauthorized') {
         dispatch(setSnack('You are not login!', 'error'));
      } else if (
         error.response &&
         error.response.data &&
         error.response.data.errors
      ) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};

export const unlikeWallPost = (wallId, postId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/wall/unlike/${wallId}/${postId}`);
      dispatch({
         type: UPDATE_WALLLIKES,
         payload: { wallId, postId, data: res.data },
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const likeWallPost = (wallId, postId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/wall/like/${wallId}/${postId}`);

      dispatch({
         type: UPDATE_WALLLIKES,
         payload: { wallId, postId, data: res.data },
      });
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
export const deleteWallPost = (wallId, postId) => async (dispatch) => {
   try {
      let res = await axios.delete(`/api/wall/${wallId}/${postId}`);
      dispatch({
         type: DELETE_WALLPOST,
         payload: postId,
      });
      // dispatch({
      //    type: GET_INIT_WALL,
      //    payload: res.data,
      // });
      // window.location.reload();

      dispatch(setSnack('Post Deleted', 'success'));
   } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
         error.response.data.errors.forEach((err) => {
            dispatch(setAlert(err.msg, 'error'));
         });
      }
   }
};
