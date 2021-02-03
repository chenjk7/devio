import React, { Fragment, useState } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import {
   Typography,
   IconButton,
   Badge,
   Tooltip,
   Hidden,
   InputBase,
} from '@material-ui/core/';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CusPopover from '../posts/CusPopover';
import DeveloperHomeWallComments from './DeveloperHomeWallComments';
import {
   createWallPostComment,
   unlikeWallPost,
   deleteWallPost,
   likeWallPost,
} from '../redux/action/wall';
import EmojiPopover from './EmojiPopover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      margin: '10px 0',
      [theme.breakpoints.up('md')]: {
         width: 'minmax(1000px,auto)',
      },
   },
   expandContent: {},
   expand: {
      paddingTop: 0,
      paddingBottom: 0,
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      paddingTop: 0,
      paddingBottom: 0,
      transform: 'rotate(180deg)',
   },
   avatar: {
      backgroundColor: red[500],
   },
   cover: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      borderRadius: '50%',
   },
   large: {
      width: theme.spacing(4),
      height: theme.spacing(4),
   },
   LinkBTN: theme.LinkBTN,
   link: {
      textDecoration: 'none',
      color: 'black',
      width: '100%',
      '&:hover': {
         backgroundColor: '#EFEFEF',
      },
   },
   cardheader: {
      padding: '0 10px',
   },
   cardcontent: {
      width: '100%',
      display: 'flex',
      padding: '0 20px',
      justifyContent: 'space-between',
      // padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
         flexDirection: 'column',
      },
   },
   comments: {
      borderRadius: '10px',
      // "&:hover": {
      //    backgroundColor: "#EFEFEF",
      //    cursor: "pointer",
      // },
      '& > * ': {
         marginRight: theme.spacing(1),
      },
      padding: 4,
   },
   badge: {
      marginLeft: 4,
   },
   cardactionContent: {
      marginTop: 0,
      margin: '0 20px',
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
   },
   cardaction: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      '&>*': {
         marginRight: theme.spacing(3),
      },
   },
   iconButton: {
      padding: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
   },
   commetBox: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      '& > *': {
         marginLeft: theme.spacing(1),
      },
   },
   commentText: {
      width: '100%',
   },
   cardheaderMenu: {
      marginTop: theme.spacing(1),
   },
   deletePost: {
      color: 'red',
   },
}));

const StyledBadge = withStyles((theme) => ({
   badge: {
      right: -5,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
   },
}))(Badge);

const CustomInput = withStyles((theme) => ({
   root: {
      'label + &': {
         marginTop: theme.spacing(3),
      },
   },
   input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
         '-apple-system',
         'BlinkMacSystemFont',
         '"Segoe UI"',
         'Roboto',
         '"Helvetica Neue"',
         'Arial',
         'sans-serif',
         '"Apple Color Emoji"',
         '"Segoe UI Emoji"',
         '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
         boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
         borderColor: theme.palette.primary.main,
      },
   },
}))(InputBase);
const DeveloperHomeWallPostsItem = ({
   post,
   auth: { user, loading },
   index,
   createWallPostComment,
   wallId,
   unlikeWallPost,
   deleteWallPost,
   likeWallPost,
}) => {
   const classes = useStyles();
   const [expanded, setExpanded] = React.useState(true);
   const { avatar: authAvatar, _id } = user || '';
   const {
      _id: postId,
      user: postUser,
      text,
      likes,
      name,
      comments,
      avatar,
      date,
   } = post || {};
   const { avatar: postUser_avatar, _id: postUser_id } = postUser || {};

   const [openMenu, setOpenMenu] = React.useState(false);
   const menuRef = React.useRef(null);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };
   const handleLike = () => {
      if (likes.find((like) => like.user == _id)) {
         unlikeWallPost(wallId, postId);
      } else {
         likeWallPost(wallId, postId);
      }
   };
   const [commentText, setCommentText] = useState('');
   const handleAddEmoji = (emo) => {
      setCommentText(commentText + emo);
   };
   const clearCommentInput = () => {
      setCommentText('');
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
   const handleCommentChange = (e) => {
      setCommentText(e.target.value);
   };
   const handleCommentEnter = (e) => {
      const keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
         createWallPostComment(
            { text: commentText },
            wallId,
            postId,
            clearCommentInput
         );
      }
   };

   const commentBox = (
      <div className={classes.commetBox}>
         <Avatar alt="#" src={authAvatar} />
         <CustomInput
            // className={classes.textField}
            placeholder="Write a comment . . ."
            className={classes.commentText}
            value={commentText}
            type="text"
            onKeyUp={handleCommentEnter}
            onChange={handleCommentChange}
         />
         <EmojiPopover handleAddEmoji={handleAddEmoji}>
            <IconButton>
               <EmojiEmotionsIcon />
            </IconButton>
         </EmojiPopover>
         {/* <TextField
            id="outlined-margin-dense"
            // className={classes.textField}
            placeholder="Write a comment"
            margin="dense"
            value={commentText}
            type="text"
            variant="outlined"
            onKeyUp={handleCommentEnter}
            onChange={handleCommentChange}
         /> */}
      </div>
   );
   const handleToggleMenu = () => {
      setOpenMenu((prevOpen) => !prevOpen);
   };

   const prevOpen = React.useRef(openMenu);
   React.useEffect(() => {
      if (prevOpen.current === true && openMenu === false) {
         menuRef.current.focus();
      }

      prevOpen.current = openMenu;
   }, [openMenu]);

   const handleCloseMenu = (event) => {
      if (menuRef.current && menuRef.current.contains(event.target)) {
         return;
      }
      setOpenMenu(false);
   };
   function handleListKeyDown(event) {
      if (event.key === 'Tab') {
         event.preventDefault();
         setOpenMenu(false);
      }
   }
   const onHandleDeletePost = (e) => {
      deleteWallPost(wallId, postId);
      handleCloseMenu(e);
   };
   const cardheaderMenu = (
      <Popper
         open={openMenu}
         anchorEl={menuRef.current}
         role={undefined}
         transition
         disablePortal
      >
         {({ TransitionProps, placement }) => (
            <Grow
               {...TransitionProps}
               style={{
                  transformOrigin:
                     placement === 'bottom' ? 'center top' : 'center bottom',
               }}
            >
               <Paper>
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                     <MenuList
                        autoFocusItem={openMenu}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                     >
                        {_id && postUser_id && postUser_id == _id && (
                           <MenuItem
                              className={classes.deletePost}
                              onClick={onHandleDeletePost}
                           >
                              Delete post
                           </MenuItem>
                        )}
                     </MenuList>
                  </ClickAwayListener>
               </Paper>
            </Grow>
         )}
      </Popper>
   );
   return post ? (
      <Fragment>
         <Card className={classes.root} raised="false">
            <CardHeader
               className={classes.cardheader}
               avatar={
                  <IconButton>
                     <Avatar className={classes.small}>
                        <CardMedia
                           className={classes.cover}
                           image={
                              postUser && postUser_avatar
                                 ? postUser_avatar
                                 : avatar
                           }
                           title="Live from space album cover"
                        />
                     </Avatar>
                  </IconButton>
               }
               title={
                  <div className={classes.postuser}>
                     <span>Posted by&nbsp;</span>
                     <Link
                        to={`/developers/${postUser_id}`}
                        className={classes.LinkBTN}
                     >
                        <CusPopover
                           type="profile"
                           name={name}
                           link={`/api/profile/user/${postUser_id}`}
                        />
                        &nbsp;
                     </Link>
                     {calcDate(date)}
                     {/* <Moment format="YYYY/MM/DD">{date}</Moment> */}
                  </div>
               }
               action={
                  <div className={classes.cardheaderMenu}>
                     {_id && postUser_id && postUser_id == _id && (
                        <IconButton onClick={handleToggleMenu} ref={menuRef}>
                           <MoreVertIcon />
                        </IconButton>
                     )}
                  </div>
               }
            />
            {cardheaderMenu}
            <CardContent className={classes.cardcontent}>
               <div>
                  <Typography variant="h6">{text}</Typography>
               </div>
            </CardContent>
            <div className={classes.cardactionContent}>
               <hr />
               <CardActions className={classes.cardaction} disableSpacing>
                  <Tooltip
                     title={
                        _id &&
                        likes != [] &&
                        likes.find((like) => like.user == _id)
                           ? 'Unlike this post'
                           : 'Like this post'
                     }
                  >
                     <IconButton
                        aria-label="add to favorites"
                        className={classes.iconButton}
                        onClick={() => handleLike()}
                     >
                        <StyledBadge
                           badgeContent={likes && likes.length}
                           color="primary"
                        >
                           <FavoriteIcon className={classes.iconButton} />
                        </StyledBadge>
                     </IconButton>
                  </Tooltip>

                  <div className={classes.comments}>
                     <StyledBadge
                        badgeContent={comments && comments.length}
                        color="primary"
                     >
                        <CommentIcon />
                     </StyledBadge>
                     <Hidden smDown>
                        <span>&nbsp;Comments</span>
                     </Hidden>
                  </div>
                  <IconButton
                     className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                     })}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label="show more"
                  >
                     <ExpandMoreIcon className={classes.iconButton} />
                  </IconButton>
               </CardActions>
               <hr />
            </div>
            <Collapse
               in={expanded}
               timeout="auto"
               unmountOnExit
               className={classes.expandContent}
            >
               <Fragment>
                  <CardContent>
                     <DeveloperHomeWallComments post={post} />
                     {commentBox}
                  </CardContent>
               </Fragment>
            </Collapse>
         </Card>
      </Fragment>
   ) : (
      <div></div>
   );
};

DeveloperHomeWallPostsItem.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, {
   likeWallPost,
   unlikeWallPost,
   deleteWallPost,
   createWallPostComment,
})(DeveloperHomeWallPostsItem);
