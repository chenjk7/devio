import {
   SET_ALERT,
   SET_SNACK,
   REMOVE_ALERT,
   REMOVE_SNACK,
} from '../action/type';

const initState = {
   alerts: [],
   snack: { msg: '', type: '', open: false },
};

const alerts = (state = initState, action) => {
   const { type, payload } = action;

   switch (type) {
      case SET_ALERT:
         return {
            ...state,
            alerts: [...state.alerts, payload],
         };
      case REMOVE_ALERT:
         return {
            ...state,
            alerts: state.alerts.filter((alert) => alert.id != payload),
         };
      case SET_SNACK:
         return {
            ...state,
            snack: payload,
         };
      case REMOVE_SNACK:
         return {
            ...state,
            snack: { ...state.snack, open: false },
         };
      default:
         return state;
   }
};
export default alerts;
