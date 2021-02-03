import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { unfollowUser } from '../redux/action/profiles';
import { Link } from 'react-router-dom';
import CusPopover from '../posts/CusPopover';
const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      border: '1px solid #F5F5F5',
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      width: '100%',
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   avatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      borderRadius: theme.spacing(1),
   },
   detail: {
      marginLeft: theme.spacing(2),
   },
   LinkBTN: theme.LinkBTN,
   textwrap: {
      wordWrap: 'anywhere',
   },
   unfollowBtn: {
      margin: 'auto 0 auto auto',
      [theme.breakpoints.down('xs')]: {
         marginLeft: theme.spacing(2),
      },
   },
   content: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
         display: 'block',
      },
   },
}));
const DeveloperFollowsItem = ({ user, unfollowUser, auth, profile }) => {
   const { user: auth_user, isAuthenticated } = auth;
   const classes = useStyles();
   const [followingUser, setFollowingUser] = useState({});
   useEffect(() => {
      async function getUser() {
         const res = await axios.get(`/api/profile/user/${user.user}`);
         setFollowingUser(res.data);
      }
      getUser();
   });
   const { user: thisUser, company, status } = followingUser || {};
   const { _id, avatar, name } = thisUser || {};
   const HandleUnfollowUser = (id) => {
      unfollowUser(id);
   };
   return (
      <Fragment>
         {thisUser && (
            <div className={classes.root}>
               <Link to={`/developers/${_id}`} className={classes.LinkBTN}>
                  <CusPopover
                     type="profile"
                     name={
                        <img className={classes.avatar} src={avatar} alt="" />
                     }
                     link={`/api/profile/user/${_id}`}
                  />
               </Link>
               <div className={classes.content}>
                  <div className={classes.detail}>
                     <Link
                        to={`/developers/${_id}`}
                        className={classes.LinkBTN}
                     >
                        <CusPopover
                           type="profile"
                           name={name}
                           link={`/api/profile/user/${_id}`}
                        />
                        &nbsp;
                     </Link>
                     <div className={classes.textwrap}>
                        {status} at {company}
                     </div>
                  </div>
                  {isAuthenticated && auth_user._id == profile.user._id && (
                     <div className={classes.unfollowBtn}>
                        <Button
                           variant="contained"
                           color="primary"
                           onClick={() => HandleUnfollowUser(user.user)}
                        >
                           Unfollow
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         )}
      </Fragment>
   );
};

const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { unfollowUser })(DeveloperFollowsItem);
