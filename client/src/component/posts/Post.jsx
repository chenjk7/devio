import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button, Chip, Tooltip, Badge, Hidden } from '@material-ui/core';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';
import { unlikeAPost, likeAPost, getPostById } from '../redux/action/posts';
import axios from 'axios';
import Developersitem from '../developers/Developersitem';
import PostComments from './PostComments';
import CreateComment from './CreateComment';
import { setSnack } from '../redux/action/alerts';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CusPopover from './CusPopover';
const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      marginTop: theme.spacing(2),
   },
   main: {
      width: '100%',
   },
   cover: {
      width: theme.spacing(1),
      height: theme.spacing(1),
      // borderRadius: '50%',
      padding: theme.spacing(2),
   },
   avatar: {
      backgroundColor: red[500],
   },
   LinkBTN: theme.LinkBTN,
   cardcontent: {
      width: '100%',
      display: 'flex',
      padding: theme.spacing(4),
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
   large: {
      width: theme.spacing(1),
      height: theme.spacing(1),
   },
   name: {
      color: '#0600B3',
      fontWeight: 'bold',
   },
   title: {
      marginBottom: 30,
      wordWrap: 'anywhere',
   },
   popover: {
      pointerEvents: 'none',
      maxWidth: 1000,
   },
   paper: {
      padding: theme.spacing(1),
   },
   Comments: {
      marginTop: theme.spacing(3),
   },
   cardaction: {
      paddingLeft: theme.spacing(4),
   },
   textwrap: {
      wordWrap: 'anywhere',
   },
}));
const Post = ({
   auth: { user, loading, isAuthenticated },
   unlikeAPost,
   likeAPost,
   getPostById,
   setSnack,
   post,
   match: { params },
}) => {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const {
      _id,
      user: post_user,
      name,
      avatar,
      date,
      title,
      text,
      likes,
      comments,
   } = post || {};
   const { avatar: postUser_avatar, _id: postUser_id } = post_user || {};
   const [postUserProfile, setPostUserProfile] = useState({});
   const handlePopoverOpen = async (event) => {
      //get profile by id
      setAnchorEl(event.currentTarget);
      try {
         const res = await axios.get(`/api/profile/user/${post_user}`);
         setPostUserProfile(res.data);
      } catch (error) {
         setPostUserProfile(null);
      }
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };
   useEffect(() => {
      getPostById(params.id);
   }, [getPostById]);

   const handleLike = (id) => {
      if (user)
         if (likes.find((like) => like.user == user._id)) {
            unlikeAPost(id);
         } else {
            likeAPost(id);
         }
      else {
         setSnack('You are not login', 'warning');
      }
   };
   const popoverContent = postUserProfile != null && postUserProfile != {} && (
      <Popover
         id='mouse-over-popover'
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
      post && (
         <div>
            <div className={classes.main}>
               <Card className={classes.root}>
                  <div className={classes.details}>
                     <CardHeader
                        avatar={
                           <Link
                              to={`/developers/${postUser_id}`}
                              className={classes.LinkBTN}
                           >
                              <IconButton>
                                 <Avatar
                                    className={classes.small}
                                    src={
                                       post_user && postUser_avatar
                                          ? postUser_avatar
                                          : avatar
                                    }
                                 ></Avatar>
                              </IconButton>
                           </Link>
                        }
                        title={
                           <div className={classes.postuser}>
                              <span>Posted by&nbsp;</span>
                              <Link
                                 to={`/developers/${postUser_id}`}
                                 className={classes.LinkBTN}
                              >
                                 <CusPopover
                                    type='profile'
                                    name={name}
                                    link={`/api/profile/user/${postUser_id}`}
                                 />
                                 &nbsp;
                                 {/* <span
                                       onMouseEnter={handlePopoverOpen}
                                       onMouseLeave={handlePopoverClose}
                                       className={classes.name}
                                    >
                                       {name}
                                       &nbsp;
                                    </span>
                                    {popoverContent} */}
                              </Link>

                              <span>
                                 on&nbsp;
                                 <Moment format='YYYY/MM/DD'>{date}</Moment>
                              </span>
                           </div>
                        }
                     />

                     <CardContent className={classes.cardcontent}>
                        {/* <div>
                        <Typography variant="h6" color="primary">
                           Status:
                        </Typography>
                        <Typography variant="subtitle1">
                           {status} at {company}
                        </Typography>
                     </div>
                     <div className={classes.skills}>
                        {profile.skills.map((skill) => (
                           <Chip size="small" label={skill} color="primary" />
                        ))}
                        
                     </div> */}

                        <div>
                           <Typography className={classes.title} variant='h4'>
                              {title}
                           </Typography>
                           <Typography
                              className={classes.textwrap}
                              variant='body2'
                           >
                              {text}
                           </Typography>
                        </div>
                     </CardContent>
                     <CardActions className={classes.cardaction}>
                        <Badge
                           badgeContent={comments && comments.length}
                           color='primary'
                        >
                           <ChatBubbleIcon />
                        </Badge>
                        <Hidden smDown>
                           <span>Comments</span>
                        </Hidden>
                        <Tooltip
                           title={
                              user &&
                              likes &&
                              likes != [] &&
                              likes.find((like) => like.user == user._id)
                                 ? 'Unlike this post'
                                 : 'Like this post'
                           }
                        >
                           <IconButton
                              aria-label='add to favorites'
                              onClick={() => handleLike(_id)}
                           >
                              <Badge
                                 badgeContent={likes && likes.length}
                                 color='primary'
                              >
                                 <FavoriteIcon />
                              </Badge>
                           </IconButton>
                        </Tooltip>
                     </CardActions>
                  </div>
               </Card>
            </div>
            <div className={classes.Comments}>
               <Typography variant='h4'>Comments:</Typography>
               <CreateComment id={_id} />
               <PostComments post={post} />
            </div>
         </div>
      )
   );
};

Post.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      post: state.posts.post,
   };
};
export default connect(mapStateToProp, {
   unlikeAPost,
   likeAPost,
   getPostById,
   setSnack,
})(Post);
