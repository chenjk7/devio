import React, { Fragment, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import EmojiPopover from './EmojiPopover';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import {
   Modal,
   Fade,
   Typography,
   IconButton,
   Button,
   Avatar,
   TextareaAutosize,
} from '@material-ui/core';

function rand() {
   return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
   const top = 50 + rand();
   const left = 50 + rand();

   return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
   };
}

const useStyles = makeStyles((theme) => ({
   paper: {
      position: 'absolute',
      maxWidth: 500,
      maxHeight: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflowY: 'auto',
      [theme.breakpoints.up('md')]: {
         width: 500,
         height: 400,
      },
   },
   title: {
      display: 'flex',
      alignItems: 'center',
      '&>*': {
         marginRight: theme.spacing(2),
         marginBottom: theme.spacing(2),
      },
   },
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   content: {
      width: '100%',
   },

   cameraIcon: {
      width: '100%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '&&:hover': {
         cursor: 'pointer',
      },
   },
   buttonControl: {
      '& >*': {
         maringRight: theme.spacing(1),
      },
   },
   textarea: {
      width: '100%',
      maxWidth: 600,
      minWidth: 200,
      maxHeight: 400,
      margin: 'auto',
      fontSize: '16px',
      marginBottom: theme.spacing(2),
   },
   emoji: {
      display: 'flex',
   },
}));
function DeveloperCreatePostModal({
   openCwpModal,
   auth,
   handleAddpost,
   handleOpenCreatePost,
   handleCloseCreatePost,
}) {
   const classes = useStyles();

   useEffect(() => {
      // return () => {
      //    setImg(avatar);
      // };
   });
   const { user: auth_user, isAuthenticated } = auth || {};
   const { name, avatar } = auth_user || {};
   const clearText = () => {
      setText('');
   };
   const onSubmit = () => {
      handleAddpost({ text }, clearText);
      handleCloseCreatePost();
   };
   const [text, setText] = useState('');
   const handleAddEmoji = (emo) => {
      setText(text + emo);
   };
   const body = (
      <Fade in={openCwpModal}>
         <div className={classes.paper}>
            <h2 id="simple-modal-title">Create Post</h2>
            <hr />
            <div className={classes.title}>
               <Avatar alt="#" src={avatar} />
               <Typography variant="subtitle1">{name}</Typography>
            </div>
            <TextareaAutosize
               className={classes.textarea}
               rowsMin={7}
               value={text}
               name="text"
               onChange={(e) => setText(e.target.value)}
               placeholder="Saying something "
            />
            <div className={classes.emoji}>
               <Button
                  className={classes.content}
                  onClick={onSubmit}
                  disabled={text ? false : true}
                  color="primary"
                  variant="contained"
               >
                  Post
               </Button>
               <EmojiPopover handleAddEmoji={handleAddEmoji}>
                  <IconButton>
                     <EmojiEmotionsIcon />
                  </IconButton>
               </EmojiPopover>
            </div>
         </div>
      </Fade>
   );

   return (
      <Fragment>
         {isAuthenticated && (
            <Modal
               open={openCwpModal}
               className={classes.modal}
               onClose={handleCloseCreatePost}
               aria-labelledby="simple-modal-title"
               aria-describedby="simple-modal-description"
            >
               {body}
            </Modal>
         )}
      </Fragment>
   );
}
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, {})(DeveloperCreatePostModal);
