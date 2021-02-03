import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import {
   Typography,
   TextField,
   Button,
   TextareaAutosize,
} from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { createPost, getPosts } from '../redux/action/posts';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
   root: {
      height: 'auto',
   },
   main: {
      // '& >*': {
      //    margin: theme.spacing(1),
      // },
   },
   textarea: {
      width: '100%',
      maxWidth: 1000,
      minWidth: 200,
      margin: 'auto',
   },
   form: {
      '& >*': {
         marginTop: theme.spacing(1),
      },

      '& > *': {
         width: '100%',
      },
   },
   action: {
      maxWidth: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      '& > *': {
         marginLeft: theme.spacing(1),
      },
      [theme.breakpoints.down('sm')]: {
         '& > *': {
            width: '100%',
            margin: 'auto',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
         },
         flexDirection: 'column-reverse',
      },
   },
}));

const CreatePost = ({ toggleCreatePost, createPost }) => {
   const classes = useStyles();
   const histroy = useHistory();
   const [info, setInfo] = useState({ title: '', text: '' });
   const onCancel = () => {
      if (toggleCreatePost) {
         toggleCreatePost();
      } else {
         histroy.push('/posts');
      }
   };
   const clearInput = () => {
      setInfo({ title: '', text: '' });
   };
   const refresh = () => {
      // history.go(0);
   };
   const onSubmit = (e) => {
      e.preventDefault();
      if (toggleCreatePost) {
         createPost(info, { clearInput, toggleCreatePost });
      } else {
         createPost(info, { histroy });
      }
   };
   return (
      <div className={classes.root}>
         <Typography variant="h3" color="primary">
            Create A Post
         </Typography>

         <Typography color="textSecondary">
            Start a discussion in the community
         </Typography>
         <form className={classes.form} onSubmit={onSubmit}>
            <TextField
               required
               id="standard-required"
               label="Title"
               nane="title"
               helperText=""
               variant="outlined"
               defaultValue=""
               placeholder="title"
               value={info.title}
               name="title"
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
            />
            <TextareaAutosize
               className={classes.textarea}
               rowsMin={4}
               value={info.text}
               name="text"
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
               placeholder="saying "
            />
            <div className={classes.action}>
               <Button variant="contained" color="secondary" onClick={onCancel}>
                  Cancel
               </Button>
               <Button variant="contained" type="Submit" color="primary">
                  Submit
               </Button>
            </div>
         </form>
      </div>
   );
};
CreatePost.propTypes = {};

export default connect(null, { createPost, getPosts })(CreatePost);
