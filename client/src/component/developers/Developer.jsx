import React, { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
   getProfileById,
   followUser,
   unfollowUser,
   getMyProfile,
} from '../redux/action/profiles';
import { connect } from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import {
   Button,
   Typography,
   IconButton,
   Hidden,
   useMediaQuery,
} from '@material-ui/core';
import { url } from 'gravatar';
import DeveloperTabs from './DeveloperTabs';
import usePrevious from '../util/usePrevious';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EditCoverModal from './EditCoverModal';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   header: {
      height: 350,
      width: 'auto',
      position: 'relative',
      // backgroundColor: '#F0F2F5',
      // overflow: 'hidden',
   },
   backgroundIMG: {
      width: '100%',
      height: 300,
      objectFit: 'cover',
   },
   headerContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      top: '65%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
   },
   avatar: {
      borderRadius: '50%',
      height: 200,
      width: 200,
      objectFit: 'cover',
      border: '2px solid #FFF',
   },
   name: {
      fontWeight: 'bold',
      // color: 'white',
   },
   Unfollow: {
      fontWeight: 'bold',
      '&:hover:after': {
         content: 'Unfollow',
      },
      '&:after': {
         content: 'Folowing',
      },
   },
   LinkBTN: theme.LinkBTN,
   edit: {
      borderRadius: 8,
   },
   editContent: {
      position: 'absolute',
      right: 10,
      backgroundColor: 'white',
      bottom: 60,
      borderRadius: 5,
      '&:hover': {
         backgroundColor: '#D9DBDD',
      },
   },
}));
const Developer = ({
   profiles: { profile, loading, myprofile },
   match,
   auth: { user: auth_user, isAuthenticated },
   getProfileById,
   followUser,
   unfollowUser,
   getMyProfile,
}) => {
   const { user, status, company, address, bio, skills, cover } = profile || {};
   const { follows } = myprofile || {};
   const { _id, name, avatar, date } = user || {};
   const classes = useStyles();
   const location = useLocation();

   useEffect(() => {
      if (auth_user && match.params.id == auth_user._id) {
         getMyProfile();
         getProfileById(match.params.id);
      } else {
         getProfileById(match.params.id);
      }
   }, []);

   const getParams = (pathname) => {
      const match = matchPath(pathname, {
         path: `/developers/:id`,
      });
      return (match && match.params) || {};
   };
   const [pathname, setPathname] = useState(location.pathname);
   const prevpathname = usePrevious(pathname);
   const [openCoverModal, setopenCoverModal] = React.useState(false);

   const handleOpenCoverModal = () => {
      setopenCoverModal(true);
   };

   const handleCloseCoverModal = () => {
      setopenCoverModal(false);
   };
   const HandleFollowUser = (id) => {
      followUser(id);
   };
   const HandleUnfollowUser = (id) => {
      unfollowUser(id);
   };
   const [text, setText] = useState('Following');
   const onMouseover = () => {
      setText('Unfollow');
   };
   //clear the text
   const onMouseout = () => {
      setText('Following');
   };
   const mounted = useRef();
   useEffect(() => {
      if (!mounted.current) {
         // do componentDidMount logic
         mounted.current = true;
      } else {
         // do componentDidUpdate logic
      }
   });
   const mobile = useMediaQuery((theme) => theme.breakpoints.down('xs'));
   return (
      !loading &&
      (profile ? (
         <div className={classes.root}>
            <div className={classes.header}>
               <img
                  className={classes.backgroundIMG}
                  src={cover ? cover : '/static/images/Coding.jpg'}
                  alt=""
               />

               <div className={classes.headerContent}>
                  <img src={avatar} className={classes.avatar} alt="" />
                  <Typography className={classes.name} variant="h4">
                     {name}
                  </Typography>
               </div>
               {isAuthenticated &&
               user &&
               auth_user &&
               auth_user._id == user._id ? (
                  <Hidden smDown>
                     <div className={classes.editContent}>
                        <IconButton
                           onClick={handleOpenCoverModal}
                           size="small"
                           className={classes.edit}
                        >
                           <PhotoCameraIcon />
                           <Typography className={classes.name} variant="p">
                              Edit cover photo
                           </Typography>
                        </IconButton>
                     </div>
                  </Hidden>
               ) : auth_user && auth_user._id != user._id ? (
                  follows &&
                  !follows.find((follow) => follow.user == user._id) ? (
                     <div className={classes.editContent}>
                        <IconButton
                           onClick={() => HandleFollowUser(user._id)}
                           size="small"
                           className={classes.edit}
                        >
                           <Typography className={classes.name} variant="p">
                              Follow
                           </Typography>
                        </IconButton>
                     </div>
                  ) : (
                     <div className={classes.editContent}>
                        <IconButton
                           onClick={() => HandleUnfollowUser(user._id)}
                           size="small"
                           className={classes.edit}
                           onMouseEnter={onMouseover}
                           onMouseLeave={onMouseout}
                        >
                           <Fragment>
                              {mobile ? (
                                 <Typography
                                    className={classes.name}
                                    variant="p"
                                 >
                                    Unfollow
                                 </Typography>
                              ) : (
                                 <Typography
                                    className={classes.name}
                                    variant="p"
                                 >
                                    {text}
                                 </Typography>
                              )}
                           </Fragment>
                        </IconButton>
                     </div>
                  )
               ) : (
                  ''
               )}
            </div>
            <hr />
            <DeveloperTabs
               match={match}
               handleOpenCoverModal={handleOpenCoverModal}
            >
               <EditCoverModal
                  cover={cover}
                  openCoverModal={openCoverModal}
                  handleOpenCoverModal={handleOpenCoverModal}
                  handleCloseCoverModal={handleCloseCoverModal}
               />
            </DeveloperTabs>
         </div>
      ) : auth_user && auth_user._id == match.params.id ? (
         profile ? (
            <Link to="/create-profile" className={classes.LinkBTN}>
               <Button variant="contained" color="primary">
                  Create a Profile
               </Button>
            </Link>
         ) : (
            <div></div>
         )
      ) : !profile && !loading ? (
         <div>User profile not found</div>
      ) : (
         <div></div>
      ))
   );
};

Developer.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      profiles: state.profiles,
      auth: state.auth,
   };
};
export default connect(mapStateToProp, {
   getProfileById,
   followUser,
   unfollowUser,
   getMyProfile,
})(Developer);
