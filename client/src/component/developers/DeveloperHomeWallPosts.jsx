import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { getInfinitWall } from '../redux/action/wall';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ProgressCir from '../layout/ProgressCir';
import DeveloperHomeWallPostsItem from './DeveloperHomeWallPostsItem';
import { Typography } from '@material-ui/core';
import ReloadSnackBar from '../layout/ReloadSnackBar';
const useStyles = makeStyles((theme) => ({
   root: {},
   postsList: {},
   posts: {
      marginTop: theme.spacing(2),
   },
   PostsTitle: {
      fontWeight: 'bold',
   },
   progress: {
      width: '100%',
      textAlign: 'center',
   },
}));
const DeveloperHomeWallPosts = ({
   auth,
   getInfinitWall,
   wall,
   wallId,
   profiles: { profile, loading },
}) => {
   const classes = useStyles();
   const { user: auth_user, isAuthenticated } = auth || {};
   const { avatar } = auth_user || {};
   const { user } = profile || {};
   const { _id } = user || {};
   const {
      wall: { user: wallUser, posts, hasMoreItems, page, pageCount },
      loading: isWallloading,
      newWallPosts,
   } = wall || {};
   // const { _id: wallId } = wallUser || {};
   return (
      <div className={classes.posts}>
         <ReloadSnackBar />
         <Typography className={classes.PostsTitle} variant="h5">
            Posts
         </Typography>
         {wallId && (
            <InfiniteScroll
               pageStart={1}
               loadMore={(p) => {
                  !isWallloading &&
                     getInfinitWall(wallId, page ? page + 1 : 1, pageCount);
               }}
               hasMore={hasMoreItems}
               key={page}
               loader={<ProgressCir key={page} />}
               loadpagesbeforestop={pageCount}
               renderpagescount={pageCount}
            >
               {posts && wallId && (
                  <div className={classes.postsList}>
                     {posts.map((post, index) => (
                        <DeveloperHomeWallPostsItem
                           key={index}
                           wallId={wallId}
                           index={index}
                           post={post}
                        />
                     ))}
                  </div>
               )}
            </InfiniteScroll>
         )}
      </div>
   );
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      wall: state.wall,
      profiles: state.profiles,
   };
};
export default connect(mapStateToProp, { getInfinitWall })(
   DeveloperHomeWallPosts
);
