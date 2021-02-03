import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { Typography, Button, TextareaAutosize } from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { commentPost } from '../redux/action/posts';
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

const CreateComment = ({ id, commentPost }) => {
   const classes = useStyles();
   const histroy = useHistory();
   const [info, setInfo] = useState({ text: '' });
   const onCancel = () => {
      clearInput();
   };
   const clearInput = () => {
      setInfo({ text: '' });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      commentPost(id, info, clearInput);
   };
   return (
      <div className={classes.root}>
         <Typography color="textSecondary" variant="p">
            Start a discussion in the post
         </Typography>
         <form className={classes.form} onSubmit={onSubmit}>
            <TextareaAutosize
               className={classes.textarea}
               rowsMin={4}
               value={info.text}
               name="text"
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
               placeholder="Say something in the comment "
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
CreateComment.propTypes = {};

export default connect(null, { commentPost })(CreateComment);
