import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import PostItem from './PostsItem';
import { useSelector, useDispatch } from 'react-redux';
import { SwipeableDrawer, Fade, CircularProgress } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PostAddIcon from '@material-ui/icons/PostAdd';
import News from '../news/News';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import CreatePost from './CreatePost';
import {
   getPosts,
   getInitPosts,
   getInfinitPosts,
   clearPosts,
} from '../redux/action/posts';
import { connect } from 'react-redux';
import ProgressCir from '../layout/ProgressCir';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
   root: {
      // [theme.breakpoints.up('md')]: {
      //    maxWidth: '800px',
      // },
   },
   expandContent: {},
   expand: {
      transform: 'rotate(0deg)',
      // marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: 'rotate(180deg)',
   },
   avatar: {
      backgroundColor: red[500],
   },

   list: {
      width: 300,
      backgroundColor: '#EEF0F1',
      padding: 10,
      '&>*': {
         marginBottom: 10,
      },
   },
   sidePanel: {},
   fullList: {
      width: 'auto',
   },
   postMenu: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   postMenubtn: {
      [theme.breakpoints.up('md')]: {
         display: 'none',
      },
   },
   postsList: {},
   posttile: {
      fontWeight: 'bold',
   },
   progress: {
      width: '100%',
      textAlign: 'center',
   },
}));

function Posts({
   posts: { posts, loading },
   auth,
   getPosts,
   getInitPosts,
   getInfinitPosts,
   clearPosts,
}) {
   const history = useHistory();
   const classes = useStyles();
   const [expanded, setExpanded] = React.useState(false);
   const [LoadMore, setLoadMore] = React.useState(true);
   const [isFetching, setFetching] = React.useState(false);
   // const [posts, setPosts] = useState({});
   const dispatch = useDispatch();
   // const { loading } = posts;
   const { user: postUser, posts: userPosts, hasMoreItems, page, pageCount } =
      posts || {};

   // useEffect(() => {
   //    const backBtnTop = (window.onpopstate = () => {
   //       window.scrollTo(0, 0);
   //    });
   //    return () => {
   //       backBtnTop();
   //    };
   // }, [getInfinitPosts]);

   // const fetchMoreData = async (e) => {
   //    if (posts.posts) {
   //       console.log('fetchMoreData', posts.posts);
   //       if (posts.posts.page < posts.posts.pageCount) {
   //          setLoadMore(true);
   //          setFetching(true);
   //          await getPosts(posts.posts.page + 1);
   //          setFetching(false);
   //       } else {
   //          setFetching(false);
   //       }
   //    }
   // };
   // const fetchMoreData = async (page) => {
   //    console.log("page", page);
   //    if (posts.posts) {
   //       console.log("fetchMoreData", posts.posts);
   //       if (posts.posts.page < posts.posts.pageCount) {
   //          setLoadMore(true);
   //          setFetching(true);
   //          await getPosts(posts.posts.page + 1);
   //          setFetching(false);
   //       } else {
   //          setFetching(false);
   //       }
   //    }
   // };

   useEffect(() => {
      getInitPosts();
   }, [getInitPosts]);
   const handleExpandClick = () => {
      setExpanded(!expanded);
   };
   const [state, setState] = React.useState(false);
   const [newPostOpen, setNewPostOpen] = React.useState(false);

   const toggleDrawer = (open) => (event) => {
      setState(open);
   };
   const list = (anchor) => (
      <div
         className={classes.list}
         onClick={toggleDrawer(anchor, false)}
         onKeyDown={toggleDrawer(anchor, false)}
      >
         <News />
      </div>
   );
   const toggleCreatePost = () => {
      setNewPostOpen(!newPostOpen);
   };
   return (
      <Fragment>
         <div className={classes.root}>
            <Collapse in={newPostOpen}>
               <CreatePost toggleCreatePost={toggleCreatePost} />
            </Collapse>
            <div>
               <div className={classes.postMenu}>
                  <Typography className={classes.posttile} variant="h5">
                     Forum Posts
                  </Typography>
                  <div>
                     <IconButton
                        onClick={toggleDrawer(true)}
                        color="inherit"
                        className={classes.postMenubtn}
                     >
                        <AnnouncementIcon />
                     </IconButton>
                     {auth && !auth.loading && auth.isAuthenticated && (
                        <Tooltip title="Add a new post" aria-label="add">
                           <IconButton
                              color="inherit"
                              onClick={toggleCreatePost}
                           >
                              <PostAddIcon />
                           </IconButton>
                        </Tooltip>
                     )}
                  </div>
               </div>
               {
                  <InfiniteScroll
                     pageStart={1}
                     loadMore={(p) => {
                        !loading && getInfinitPosts(page ? page + 1 : 1);
                     }}
                     key={page}
                     hasMore={hasMoreItems}
                     loader={<ProgressCir key={page} />}
                     loadpagesbeforestop={pageCount}
                     renderpagescount={pageCount}
                  >
                     {userPosts && (
                        <div className={classes.postsList}>
                           {userPosts.map((post, index) => (
                              <PostItem key={index} index={index} post={post} />
                           ))}
                        </div>
                     )}
                  </InfiniteScroll>
               }
               <React.Fragment>
                  <SwipeableDrawer
                     open={state}
                     anchor={'right'}
                     className={classes.sidePanel}
                     onClose={toggleDrawer(false)}
                     onOpen={toggleDrawer(true)}
                  >
                     <News />
                  </SwipeableDrawer>
               </React.Fragment>

               {/* {isFetching && history.location.pathname == '/' && <Footer />} */}
            </div>
         </div>
      </Fragment>
   );
}
const mapStateToProp = (state, ownProps) => {
   return {
      posts: state.posts,
      auth: state.auth,
   };
};
export default connect(mapStateToProp, {
   getPosts,
   getInitPosts,
   getInfinitPosts,
   clearPosts,
})(Posts);
