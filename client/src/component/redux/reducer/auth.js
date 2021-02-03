import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   GETUSER_FAIL,
   GETUSER_SUCCESS,
   LOGOUT_USER,
   CLEAR_PROFILE,
   UPDATE_ICON,
} from '../action/type';

const initState = {
   loading: true,
   user: null,
   token: localStorage.getItem('token'),
   isAuthenticated: null,
};

const auth = (state = initState, action) => {
   const { type, payload } = action;
   switch (type) {
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
         localStorage.setItem('token', payload.token);
         return {
            ...state,
            ...payload,
            loading: false,
            isAuthenticated: true,
         };
      case UPDATE_ICON:
         return {
            ...state,
            user: payload,
         };
      case GETUSER_SUCCESS:
         return {
            ...state,
            user: payload,
            loading: false,
            isAuthenticated: true,
         };
      case LOGOUT_USER:
      case GETUSER_FAIL:
      case REGISTER_FAIL:
      case LOGIN_FAIL:
         localStorage.removeItem('token');
         return {
            ...state,
            loading: false,
            user: null,
            token: null,
            isAuthenticated: false,
         };
      default:
         return state;
   }
};

export default auth;
