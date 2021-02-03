import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Button } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateCover } from '../redux/action/profiles';
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
      padding: theme.spacing(2),
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
   coverContainer: {
      position: 'relative',
      width: 300,
      height: 200,
   },
   cover: {
      width: 300,
      height: 200,
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
function EditCoverModal({
   cover,
   openCoverModal,
   handleOpenCoverModal,
   handleCloseCoverModal,
   updateCover,
}) {
   const classes = useStyles();
   // getModalStyle is not a pure function, we roll the style only on the first render
   const [modalStyle] = React.useState(getModalStyle);
   const [img, setImg] = useState(cover);
   const [cameraicon, setCameraicon] = useState(false);
   const inputFileRef = useRef(null);
   const [file, setFile] = useState(null);
   useEffect(() => {
      // return () => {
      //    setImg(cover);
      // };
   });

   const onSubmit = () => {
      const formData = new FormData();
      formData.append('cover', file);
      updateCover(formData, handleCloseCoverModal);
   };
   const body = (
      <Fade in={openCoverModal}>
         <div className={classes.paper}>
            <h2 id="simple-modal-title">Cover photo</h2>
            <div className={classes.content}>
               <div
                  className={classes.coverContainer}
                  onMouseEnter={() => setCameraicon(true)}
                  onMouseLeave={() => setCameraicon(false)}
               >
                  <img className={classes.cover} src={img} alt="" />
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
         open={openCoverModal}
         className={classes.modal}
         onClose={handleCloseCoverModal}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
      >
         {body}
      </Modal>
   );
}
export default connect(null, { updateCover })(EditCoverModal);
