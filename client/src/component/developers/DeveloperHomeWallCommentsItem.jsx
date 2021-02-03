import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import axios from 'axios';
import Developersitem from '../developers/Developersitem';
import CusPopover from '../posts/CusPopover';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(1),
   },
   main: {
      width: '100%',
   },
   details: {
      display: 'flex',
      padding: '0 auto',
      width: '100%',
      alignItems: 'flex-start',
   },
   cover: {
      padding: theme.spacing(1),
   },
   avatar: {
      backgroundColor: red[500],
   },
   LinkBTN: theme.LinkBTN,
   textContent: {
      marginLeft: theme.spacing(2),
   },
   contentDetails: {
      backgroundColor: '#F0F2F5',
      padding: theme.spacing(1),
      borderRadius: theme.spacing(2),
   },
   contentActions: {
      display: 'flex',
      alignItems: 'center',
   },
   postuser: {
      [theme.breakpoints.down('sm')]: {
         display: 'flex',
         flexDirection: 'column',
      },
   },
   small: {
      width: theme.spacing(1),
      height: theme.spacing(1),
   },
   large: {
      width: theme.spacing(4),
      height: theme.spacing(4),
   },
   name: {
      color: '#0600B3',
      fontWeight: 'bold',
   },
   title: {
      marginBottom: 30,
   },
   day: {
      fontSize: 12,
   },
   popover: {
      pointerEvents: 'none',
      maxWidth: 1000,
   },
   paper: {
      padding: theme.spacing(1),
   },
}));
const DeveloperHomeWallCommentsItem = ({
   auth: { user, loading, isAuthenticated },
   comment,
}) => {
   const { _id, user: comment_user, name, avatar, text, date } = comment;
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const {
      _id: comment_user_id,
      avatar: comment_user_avatar,
      name: comment_user_name,
   } = comment_user;

   const [postUserProfile, setPostUserProfile] = useState({});
   const handlePopoverOpen = async (event) => {
      //get profile by id
      setAnchorEl(event.currentTarget);
      try {
         const res = await axios.get(`/api/profile/user/${comment_user_id}`);
         setPostUserProfile(res.data);
      } catch (error) {
         setPostUserProfile(null);
      }
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };
   const calcDate = (date) => {
      var one_day = 1000 * 60 * 60 * 24;
      const today = new Date();
      const postday = new Date(date);

      const Result = Math.round(today.getTime() - postday.getTime()) / one_day;

      const Final_Result = Result.toFixed(0);

      return (
         <Typography
            className={classes.day}
            color="textSecondary"
            component="p"
            variant="body1"
         >
            {Final_Result == 0
               ? 'Today'
               : Final_Result == 1
               ? `${Final_Result} day ago`
               : `${Final_Result} days ago`}
         </Typography>
      );
   };
   // const popoverContent = postUserProfile != null && postUserProfile != {} && (
   //    <Popover
   //       id="mouse-over-popover"
   //       className={classes.popover}
   //       classes={{
   //          paper: classes.paper,
   //       }}
   //       open={open}
   //       anchorEl={anchorEl}
   //       anchorOrigin={{
   //          vertical: 'bottom',
   //          horizontal: 'left',
   //       }}
   //       transformOrigin={{
   //          vertical: 'top',
   //          horizontal: 'left',
   //       }}
   //       onClose={handlePopoverClose}
   //       disableRestoreFocus
   //    >
   //       {postUserProfile.user && <Developersitem profile={postUserProfile} />}
   //    </Popover>
   // );
   return (
      <div className={classes.root}>
         <div className={classes.details}>
            <div className={classes.cover}>
               <Link
                  className={classes.LinkBTN}
                  to={`/developers/${comment_user_id}`}
               >
                  <CusPopover
                     type="profile"
                     name=""
                     link={`/api/profile/user/${comment_user_id}`}
                  >
                     <Avatar
                        className={classes.large}
                        src={comment_user_avatar ? comment_user_avatar : avatar}
                     ></Avatar>
                  </CusPopover>
               </Link>
            </div>
            <div className={classes.textContent}>
               <div className={classes.contentDetails}>
                  <Link
                     className={classes.LinkBTN}
                     to={`/developers/${comment_user_id}`}
                  >
                     <CusPopover
                        type="profile"
                        name={comment_user_name}
                        link={`/api/profile/user/${comment_user_id}`}
                     />
                  </Link>
                  <Typography variant="subtitle1">{text}</Typography>
               </div>
               <div className={classes.contentActions}>{calcDate(date)}</div>
            </div>
         </div>
      </div>
   );
};

DeveloperHomeWallCommentsItem.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp)(DeveloperHomeWallCommentsItem);
