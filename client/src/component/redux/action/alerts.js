import {
   SET_ALERT,
   SET_SNACK,
   REMOVE_ALERT,
   REMOVE_SNACK,
} from '../action/type';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, type) => (dispatch) => {
   const id = uuidv4();

   dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
   });

   setTimeout(() => {
      dispatch({
         type: REMOVE_ALERT,
         payload: id,
      });
   }, 3000);
};
export const removeAlert = (id) => (dispatch) => {
   dispatch({
      type: REMOVE_ALERT,
      payload: id,
   });
};
export const setSnack = (msg, type, open = true) => (dispatch) => {
   dispatch({
      type: SET_SNACK,
      payload: { msg, type, open },
   });
};
export const removeSnack = () => (dispatch) => {
   dispatch({
      type: REMOVE_SNACK,
      payload: false,
   });
};
