import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Button } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateIcon } from '../redux/action/auth';

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
      maxWidth: 350,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   content: {
      width: '100%',
      textAlign: 'center',
      '&>*': {
         marginBottom: theme.spacing(1),
      },
   },
   avatarContainer: {
      position: 'relative',
      width: 200,
      height: 200,
   },
   avatar: {
      width: 200,
      height: 200,
      borderRadius: '50%',
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
}));
function EditIconModal({
   avatar,
   openModal,
   handleOpenModal,
   handleCloseModal,
   updateIcon,
}) {
   const classes = useStyles();
   // getModalStyle is not a pure function, we roll the style only on the first render
   const [modalStyle] = React.useState(getModalStyle);
   const [img, setImg] = useState(avatar);
   const [cameraicon, setCameraicon] = useState(false);
   const inputFileRef = useRef(null);
   const [file, setFile] = useState(null);
   useEffect(() => {
      // return () => {
      //    setImg(avatar);
      // };
   });

   const onSubmit = () => {
      const formData = new FormData();
      formData.append('avatar', file);
      updateIcon(formData, handleCloseModal);
   };
   const body = (
      <Fade in={openModal}>
         <div className={classes.paper}>
            <h2 id="simple-modal-title">Profile icon</h2>
            <div className={classes.content}>
               <div
                  className={classes.avatarContainer}
                  onMouseEnter={() => setCameraicon(true)}
                  onMouseLeave={() => setCameraicon(false)}
               >
                  <img className={classes.avatar} src={img} alt="" />
                  {cameraicon && (
                     <div
                        className={classes.cameraIcon}
                        onClick={() => inputFileRef.current.click()}
                     >
                        {/* <CameraAltIcon /> */}
                        <i className="fas fa-camera fa-5x "></i>
                     </div>
                  )}
               </div>
               <div className={classes.buttonControl}>
                  {/* <Button variant="contained" component="label">
                     Choose image */}
                  <input
                     type="file"
                     accept="image/*"
                     hidden
                     onChange={(e) => {
                        setFile(e.target.files[0]);
                        var reader = new FileReader();
                        setImg(URL.createObjectURL(e.target.files[0]));
                     }}
                     ref={inputFileRef}
                  />
                  {/* </Button> */}
                  <Button
                     onClick={onSubmit}
                     color="primary"
                     variant="contained"
                  >
                     submit
                  </Button>
               </div>
            </div>
         </div>
      </Fade>
   );
   return (
      <Modal
         open={openModal}
         className={classes.modal}
         onClose={handleCloseModal}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
      >
         {body}
      </Modal>
   );
}
export default connect(null, { updateIcon })(EditIconModal);
