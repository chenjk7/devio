import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
   ClickAwayListener,
   MenuList,
   MenuItem,
   Popper,
   Paper,
   Grow,
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unlikePost, likePost, deletePost } from '../redux/action/posts';
import { Link } from 'react-router-dom';
import CusPopover from './CusPopover';
import PostComments from './PostComments';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      border: 'solid 1px',
      margin: '10px 0',
      [theme.breakpoints.up('md')]: {
         width: 'minmax(1000px,auto)',
      },
   },
   expandContent: {},
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
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
   cardheaderMenu: {
      marginTop: theme.spacing(1),
   },
   cardcontent: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
         flexDirection: 'column',
      },
   },
   title: {
      marginBottom: 30,
   },
   comments: {
      borderRadius: '10px',
      '&:hover': {
         backgroundColor: '#EFEFEF',
      },
      padding: theme.spacing(1),
   },
   cardaction: {
      paddingLeft: theme.spacing(3),
      '&>*': {
         marginRight: theme.spacing(1),
      },
   },
   deletePost: {
      color: 'red',
   },
   textwrap: {
      wordWrap: 'anywhere',
   },
}));

const PostItem = ({
   post,
   auth: { user, loading },
   unlikePost,
   likePost,
   index,
   deletePost,
}) => {
   const classes = useStyles();
   const [expanded, setExpanded] = React.useState(false);
   const { _id } = user || '';
   const {
      _id: postId,
      user: postUser,
      title,
      text,
      likes,
      name,
      comments,
      avatar,
      date,
   } = post || {};
   const { avatar: postUser_avatar, name: postUser_name, _id: postUser_id } =
      postUser || {};
   const handleExpandClick = () => {
      setExpanded(!expanded);
   };
   const [openMenu, setOpenMenu] = React.useState(false);
   const menuRef = React.useRef(null);
   const handleLike = (id) => {
      if (likes.find((like) => like.user == _id)) {
         unlikePost(id);
      } else {
         likePost(id);
      }
   };
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
   const handleListKeyDown = (event) => {
      if (event.key === 'Tab') {
         event.preventDefault();
         setOpenMenu(false);
      }
   };
   const onHandleDeletePost = (e) => {
      deletePost(postId);
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
                        id='menu-list-grow'
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
   return post ? (
      <Fragment>
         <Card className={classes.root}>
            <CardHeader
               avatar={
                  <Link
                     to={`/developers/${postUser_id}`}
                     className={classes.LinkBTN}
                  >
                     <IconButton>
                        <Avatar className={classes.small}>
                           <CardMedia
                              className={classes.cover}
                              image={
                                 postUser && postUser_avatar
                                    ? postUser_avatar
                                    : avatar
                              }
                              title={`Go to ${postUser_name} profile`}
                           />
                        </Avatar>
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
                     </Link>

                     {calcDate(date)}
                     {/* <Moment format="YYYY/MM/DD">{date}</Moment> */}
                  </div>
               }
               action={
                  <div className={classes.cardheaderMenu}>
                     {postId && postUser_id && postUser_id == _id && (
                        <IconButton onClick={handleToggleMenu} ref={menuRef}>
                           <MoreVertIcon />
                        </IconButton>
                     )}
                  </div>
               }
            />
            {cardheaderMenu}
            <Link className={classes.link} to={`/posts/${postId}`}>
               <CardContent className={classes.cardcontent}>
                  <div>
                     <Typography className={classes.title} variant='h4'>
                        {title}
                     </Typography>
                     <Typography className={classes.textwrap} variant='body2'>
                        {text}
                     </Typography>
                  </div>
               </CardContent>
            </Link>
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
                     aria-label='add to favorites'
                     onClick={() => handleLike(postId)}
                  >
                     <Badge
                        badgeContent={likes && likes.length}
                        color='primary'
                     >
                        <FavoriteIcon />
                     </Badge>
                  </IconButton>
               </Tooltip>

               <Link className={classes.LinkBTN} to={`/posts/${postId}`}>
                  <div className={classes.comments}>
                     <Badge
                        badgeContent={comments && comments.length}
                        color='primary'
                     >
                        <CommentIcon />
                     </Badge>
                     <Hidden smDown>
                        <span>&nbsp;&nbsp;Comments</span>
                     </Hidden>
                  </div>
               </Link>
               <IconButton
                  className={clsx(classes.expand, {
                     [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label='show more'
               >
                  <ExpandMoreIcon />
               </IconButton>
            </CardActions>

            <Collapse
               in={expanded}
               timeout='auto'
               unmountOnExit
               className={classes.expandContent}
            >
               <CardContent>
                  <Typography variant='h4'>Comments:</Typography>
                  <PostComments post={post} />
               </CardContent>
            </Collapse>
         </Card>
      </Fragment>
   ) : (
      <div></div>
   );
};

PostItem.propTypes = {
   auth: PropTypes.object.isRequired,
   likePost: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired,
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { unlikePost, likePost, deletePost })(
   PostItem
);
