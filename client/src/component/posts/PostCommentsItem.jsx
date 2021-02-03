import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import { unlikePost, likePost, getPostById } from '../redux/action/posts';
import axios from 'axios';
import Developersitem from '../developers/Developersitem';
import CusPopover from './CusPopover';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      marginTop: theme.spacing(1),
      border: '1px solid #4C6EAF',
   },
   main: {
      width: '100%',
   },
   cover: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      borderRadius: '50%',
   },
   avatar: {
      backgroundColor: red[500],
   },
   LinkBTN: theme.LinkBTN,
   cardcontent: {
      width: '100%',
      display: 'flex',
      '& > *': {
         paddingLeft: 16,
      },
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
         flexDirection: 'column',
      },
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
   popover: {
      pointerEvents: 'none',
      maxWidth: 1000,
   },
   paper: {
      padding: theme.spacing(1),
   },
}));
const PostCommentsItem = ({
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
         <span>
            {Final_Result == 0
               ? 'Today'
               : Final_Result == 1
               ? `${Final_Result} day ago`
               : `${Final_Result} days ago`}
         </span>
      );
   };
   const popoverContent = postUserProfile != null && postUserProfile != {} && (
      <Popover
         id="mouse-over-popover"
         className={classes.popover}
         classes={{
            paper: classes.paper,
         }}
         open={open}
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
         }}
         transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
         }}
         onClose={handlePopoverClose}
         disableRestoreFocus
      >
         {postUserProfile.user && <Developersitem profile={postUserProfile} />}
      </Popover>
   );
   return (
      <div>
         <div className={classes.main}>
            <Card className={classes.root}>
               <div className={classes.details}>
                  <CardHeader
                     avatar={
                        <Link
                           className={classes.LinkBTN}
                           to={`/developers/${comment_user_id}`}
                        >
                           <IconButton>
                              <Avatar
                                 className={classes.large}
                                 // src={
                                 //    comment_user_avatar
                                 //       ? comment_user_avatar
                                 //       : avatar
                                 // }
                              >
                                 <CardMedia
                                    className={classes.cover}
                                    image={
                                       comment_user_avatar
                                          ? comment_user_avatar
                                          : avatar
                                    }
                                    title=""
                                 />
                              </Avatar>
                           </IconButton>
                        </Link>
                     }
                     title={
                        <div className={classes.postuser}>
                           <span>Posted by&nbsp;</span>
                           <Link
                              to={`/developers/${comment_user_id}`}
                              className={classes.LinkBTN}
                           >
                              <CusPopover
                                 type="profile"
                                 name={name}
                                 link={`/api/profile/user/${comment_user_id}`}
                              />
                              &nbsp;
                           </Link>

                           {/* <span
                                 onMouseEnter={handlePopoverOpen}
                                 onMouseLeave={handlePopoverClose}
                                 className={classes.name}
                              >
                                 {name}
                              </span>
                           </Link>
                           {popoverContent} */}

                           {/* <span>
                              &nbsp;on&nbsp;
                              <Moment format="YYYY/MM/DD">{date}</Moment>
                           </span> */}
                           {calcDate(date)}
                        </div>
                     }
                  />
                  <CardContent className={classes.cardcontent}>
                     <div>
                        <Typography variant="body2">{text}</Typography>
                     </div>
                  </CardContent>
               </div>
            </Card>
         </div>
      </div>
   );
};

PostCommentsItem.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { unlikePost, likePost, getPostById })(
   PostCommentsItem
);
