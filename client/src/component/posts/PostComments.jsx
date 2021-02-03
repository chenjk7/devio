import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import { unlikePost, likePost, getPostById } from '../redux/action/posts';
import PostCommentsItem from './PostCommentsItem';

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
   },
   popover: {
      pointerEvents: 'none',
      maxWidth: 1000,
   },
   paper: {
      padding: theme.spacing(1),
   },
}));
const PostComments = ({
   auth: { user, loading, isAuthenticated },
   unlikePost,
   likePost,
   getPostById,
   post,
}) => {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const { _id, user: post_user, comments } = post;
   const [postUserProfile, setPostUserProfile] = useState({});

   return comments ? (
      <div className={classes.main}>
         {comments.map((comment) => (
            <PostCommentsItem key={_id} comment={comment} />
         ))}
      </div>
   ) : (
      <div></div>
   );
};

PostComments.propTypes = {};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { unlikePost, likePost, getPostById })(
   PostComments
);
