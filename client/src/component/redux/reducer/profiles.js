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
   GET_INIT_PROFILES,
   UPDATE_FOLLOW,
} from "../action/type";

const initState = {
   loading: true,
   profiles: {
      hasMoreItems: false,
      profiles: [],
   },
   myprofile: null,
   profile: null,
};

export default (state = initState, action) => {
   const { type, payload } = action;
   let allProfiles = state.profiles.profiles.slice();
   if (payload && payload.profiles) {
      payload.profiles.forEach((plProfile) => {
         if (!allProfiles.find((profile) => profile._id == plProfile._id)) {
            allProfiles.push(plProfile);
         }
      });
   }

   switch (type) {
      case GET_PROFILES:
         return {
            ...state,
            profiles: { ...payload },
            loading: false,
         };
      case GET_INIT_PROFILES:
         return {
            ...state,
            profiles: payload,
            loading: false,
         };
      case INFINIT_PROFILES:
         return {
            ...state,
            profiles: {
               ...payload,
               profiles: [...allProfiles],
            },
            loading: false,
         };
      case UPDATE_FOLLOW: {
         return {
            ...state,
            loading: false,
            myprofile: {
               ...state.profile,
               follows: payload,
            },
         };
      }
      case UPDATE_PROFILE:
      case GET_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false,
         };
      case GET_MYPROFILE:
         return {
            ...state,
            myprofile: payload,
            loading: false,
         };
      case CREATE_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false,
         };
      case UPDATE_COVER:
         return {
            ...state,
            profile: payload,
            loading: false,
         };
      case CLEAR_PROFILE:
         return {
            ...state,
            profile: null,
            myprofile: null,
         };
      case PROFILE_LOADING:
         return {
            ...state,
            loading: true,
         };
      default:
         return state;
   }
};
