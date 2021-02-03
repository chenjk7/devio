import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Avatar, Fab } from '@material-ui/core';
import { connect } from 'react-redux';
import DeveloperCreatePostModal from './DeveloperCreatePostModal';
import {
   getInfinitWall,
   createWallPost,
   getInitialWall,
} from '../redux/action/wall';
import DeveloperHomeWallPosts from './DeveloperHomeWallPosts';
const useStyles = makeStyles((theme) => ({
   root: {
      // minWidth: 275,
      width: '100%',
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },

   intro: {
      display: 'flex',
      marginBottom: theme.spacing(2),

      '&>:first-child': {
         marginRight: theme.spacing(1),
      },
   },
   textwrap: {
      wordWrap: 'anywhere',
   },
   cardAction: {
      display: 'flex',
      padding: theme.spacing(2),
   },
   cardActionText: {
      backgroundColor: '#F1F2F5',
      WebkitBoxShadow: 'none',
      width: '100%',
      marginLeft: theme.spacing(1),
   },
}));
const DeveloperHomeWall = ({
   auth,
   profiles: { profile, loading },
   getInfinitWall,
   createWallPost,
   getInitialWall,
   wallId,
   wall: { posts },
}) => {
   const { user } = profile || {};
   const { name } = user || {};
   const classes = useStyles();
   const { user: auth_user, isAuthenticated } = auth || {};
   const { avatar, _id } = auth_user || {};
   const [openCwpModal, setOpenCwpModal] = useState(false);
   const handleCloseCreatePost = () => {
      setOpenCwpModal(false);
   };
   const handleOpenCreatePost = () => {
      setOpenCwpModal(true);
   };
   useEffect(() => {
      if (wallId) getInitialWall(wallId);
   }, []);
   const handleAddpost = (formdata, clearText) => {
      createWallPost(formdata, wallId, clearText);
   };
   return (
      <div>
         {!loading && isAuthenticated && name && (
            <Card className={classes.cardAction}>
               <Avatar alt="#" src={avatar} />
               <Fab
                  className={classes.cardActionText}
                  variant="extended"
                  color="inherit"
                  aria-label="edit"
                  onClick={handleOpenCreatePost}
                  extend
               >
                  Say something to {name} ...
               </Fab>
            </Card>
         )}
         <DeveloperHomeWallPosts wallId={wallId} />
         <DeveloperCreatePostModal
            openCwpModal={openCwpModal}
            handleAddpost={handleAddpost}
            handleCloseCreatePost={handleCloseCreatePost}
            handleOpenCreatePost={handleOpenCreatePost}
         />
      </div>
   );
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      profiles: state.profiles,
      wall: state.wall,
   };
};
export default connect(mapStateToProp, {
   getInfinitWall,
   getInitialWall,
   createWallPost,
})(DeveloperHomeWall);
