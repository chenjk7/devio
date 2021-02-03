import {
   GET_POSTS,
   CREATE_POST,
   POSTS_LOADING,
   GET_INIT_POSTS,
   UPDATE_LIKES,
   GET_POST,
   COMMENT_POST,
   LIKE_UPDATE,
   CLEAR_POSTS,
   INFINIT_POSTS,
   DELETE_POST,
} from "../action/type";
const initState = {
   post: null,
   posts: { posts: [], hasMoreItems: true },
   loading: true,
};

const posts = (state = initState, action) => {
   const { type, payload } = action;

   let newPosts = state.posts.posts.slice();
   if (payload && payload.posts) {
      payload.posts.forEach((plPost) => {
         if (!newPosts.find((post) => post._id == plPost._id)) {
            newPosts.push(plPost);
         }
      });
   }

   switch (type) {
      case POSTS_LOADING:
         return {
            ...state,
            loading: true,
         };
      case GET_POSTS:
         return {
            ...state,
            posts: {
               ...payload,
            },
            loading: false,
         };
      case INFINIT_POSTS:
         return {
            ...state,
            loading: false,
            posts: {
               ...payload,
               posts: [...newPosts],
            },
            loading: false,
         };
      case GET_INIT_POSTS:
         return {
            ...state,
            posts: { ...payload },
            loading: false,
         };
      case DELETE_POST:
         return {
            ...state,
            loading: false,
            posts: {
               ...state.posts,
               posts: state.posts.posts.filter((post) => post._id != payload),
            },
         };
      case COMMENT_POST:
      case GET_POST:
         return {
            ...state,
            post: payload,
            loading: false,
            posts: { posts: [], hasMoreItems: true },
         };

      case LIKE_UPDATE:
         return {
            ...state,
            post: {
               ...state.post,
               likes: payload,
            },
         };

      case UPDATE_LIKES:
         return {
            ...state,
            posts: {
               ...state.posts,
               posts: state.posts.posts.map((post) =>
                  post._id == payload.id
                     ? { ...post, likes: payload.data }
                     : post
               ),
            },
         };

      case CREATE_POST:
         return {
            ...state,
            loading: false,
            posts: {
               ...state.posts,
               posts: [payload, ...state.posts.posts],
            },
         };
      case GET_INIT_POSTS:
         return {
            ...state,
            loading: false,
            posts: payload,
         };
      case CLEAR_POSTS:
         return {
            ...state,
            posts: { posts: [], hasMoreItems: true },
         };
      default:
         return state;
   }
};

export default posts;
