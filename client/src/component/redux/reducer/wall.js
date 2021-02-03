import {
   GET_WALL,
   INFINIT_WALL,
   CREATE_WALLPOST,
   GET_INIT_WALL,
   COMMENT_WALLPOST,
   UPDATE_WALLLIKES,
   WALLPOST_DELETED,
   CLEAR_WALL,
   DETECT_WALLPOSTS,
   CLEAR_DETECT_WALLPOSTS,
   DELETE_WALLPOST,
} from "../action/type";

const initState = {
   loading: true,
   wall: {
      posts: [],
      hasMoreItems: true,
   },
   newWallPosts: false,
};

const wall = (state = initState, action) => {
   const { type, payload } = action;
   let newPosts = state.wall.posts.slice();
   if (payload && payload.posts) {
      payload.posts.forEach((plPost) => {
         if (!newPosts.find((post) => post._id == plPost._id)) {
            newPosts.push(plPost);
         }
      });
   }
   switch (type) {
      case INFINIT_WALL:
         return {
            ...state,
            loading: false,
            wall: {
               ...payload,
               posts: [...newPosts],
            },
         };
      case GET_INIT_WALL:
         return {
            ...state,
            loading: false,
            wall: { ...payload },
            newWallPosts: payload.isNewPosts,
         };
      case COMMENT_WALLPOST:
         return {
            ...state,
            loading: false,
            wall: {
               ...state.wall,
               posts: state.wall.posts.map((post) =>
                  post._id === payload.postId
                     ? { ...post, comments: [...payload.data] }
                     : post
               ),
            },
         };
      case CREATE_WALLPOST:
         return {
            ...state,
            loading: false,
            wall: { ...state.wall, posts: [payload, ...state.wall.posts] },
         };
      case DELETE_WALLPOST:
         return {
            ...state,
            loading: false,
            wall: {
               ...state.wall,
               posts: state.wall.posts.filter((post) => post._id != payload),
            },
         };
      case UPDATE_WALLLIKES:
         return {
            ...state,
            loading: false,
            wall: {
               ...state.wall,
               posts: state.wall.posts.map((post) =>
                  post._id == payload.postId
                     ? { ...post, likes: payload.data }
                     : post
               ),
            },
         };
      case WALLPOST_DELETED:
         return {
            ...state,
            loading: false,
            wall: {
               ...state.wall,
               posts: state.wall.posts.filter((post) => post._id != payload),
            },
         };
      case CLEAR_WALL:
         return {
            ...state,
            wall: { posts: [], hasMoreItems: true },
         };
      case DETECT_WALLPOSTS:
         return {
            ...state,
            newWallPosts: true,
         };
      default:
         return state;
   }
};
export default wall;
