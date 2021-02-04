import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Avatar, useMediaQuery, Typography } from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddExperienceForm from './AddExperienceForm';
import AddEducationForm from './AddEducationForm';
import Experiences from './Experiences';
import Education from './Education';
import {
   getMyProfile,
   deleteExperience,
   deleteEducation,
} from '../redux/action/profiles';
import EditProfileForm from '../profiles/EditProfileForm';
import CreateProfileForm from '../profiles/CreateProfileForm';

const useStyles = makeStyles((theme) => ({
   root: {},
   main: {
      // '& >*': {
      //    margin: theme.spacing(1),
      // },
   },
   header: {
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
         '& >*': {
            margin: theme.spacing(1),
         },
      },
      alignItems: 'flex-end',
   },
   control: {
      [theme.breakpoints.up('sm')]: {
         '& > *': {
            margin: theme.spacing(1),
         },
      },
      [theme.breakpoints.down('xs')]: {
         display: 'flex',
         flexDirection: 'column',
         margin: 'auto',
         '& > *': {
            margin: theme.spacing(1),
         },
      },
   },
   avatar: {
      [theme.breakpoints.down('sm')]: {
         width: theme.spacing(4),
         height: theme.spacing(4),
      },
   },
   extendedIcon: {
      marginRight: theme.spacing(1),
   },
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      margin: theme.spacing(2),
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
   experience: {
      [theme.breakpoints.down(250)]: {
         width: 250,
      },
      marginTop: 20,
      '& > :first-child': {
         marginBottom: 20,
      },
   },
   education: {
      [theme.breakpoints.down(250)]: {
         width: '80vw',
      },
      [theme.breakpoints.down('xs')]: {
         width: 300,
      },
      marginTop: 20,
      '& > :first-child': {
         marginBottom: 20,
      },
   },
}));
const Dashboard = ({
   auth,
   profiles,
   getMyProfile,
   deleteExperience,
   deleteEducation,
}) => {
   const classes = useStyles();
   const { user } = auth;
   const { myprofile } = profiles;
   const { experience } = myprofile || {};
   const { education } = myprofile || {};
   const { name, avatar } = user || {};
   const [open, setOpen] = useState(false);
   const [addType, SetAddType] = useState('exp');
   const Desktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
   useEffect(() => {
      getMyProfile();
   }, []);
   const handleAddExp = () => {
      SetAddType('exp');
      setOpen(true);
   };
   const handleAddEdu = () => {
      SetAddType('edu');
      setOpen(true);
   };
   const handleEditProfile = () => {
      SetAddType('editProfile');
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   const onDeleteExp = (id) => {
      deleteExperience(id);
   };
   const onDeleteEdu = (id) => {
      deleteEducation(id);
   };
   return (
      <div className={classes.root}>
         <Typography variant='h3' color='primary'>
            Dashboard
         </Typography>
         <div className={classes.main}>
            {!auth.loading && (
               <div className={classes.header}>
                  <Avatar className={classes.avatar} alt='' src={avatar} />
                  <Typography variant={Desktop ? 'h5' : 'h6'}>
                     Welcome
                  </Typography>
                  <Typography variant={Desktop ? 'h4' : 'h6'}>
                     {name}
                  </Typography>
               </div>
            )}
            <div className={classes.control}>
               {!myprofile ? (
                  <Fab
                     color='primary'
                     size='small'
                     variant='extended'
                     onClick={() => {
                        SetAddType('createProfile');
                        setOpen(true);
                     }}
                  >
                     <AddIcon />
                     Create Profile
                  </Fab>
               ) : (
                  <Fragment>
                     <Fab
                        color='secondary'
                        size='small'
                        variant='extended'
                        onClick={handleEditProfile}
                     >
                        <EditIcon />
                        Edit Profile
                     </Fab>
                     <Fab
                        color='primary'
                        size='small'
                        variant='extended'
                        onClick={handleAddExp}
                     >
                        <AddIcon />
                        Add Experience
                     </Fab>
                     <Fab
                        color='primary'
                        size='small'
                        variant='extended'
                        onClick={handleAddEdu}
                     >
                        <AddIcon />
                        Add Education
                     </Fab>
                  </Fragment>
               )}
            </div>
            <div className={classes.experience}>
               <Typography variant='h4'>Experiences:</Typography>
               <Experiences experience={experience} onDeleteExp={onDeleteExp} />
            </div>
            <div className={classes.education}>
               <Typography variant='h4'>Educations:</Typography>
               <Education education={education} onDeleteEdu={onDeleteEdu} />
            </div>

            <div>
               <Modal
                  aria-labelledby='transition-modal-title'
                  aria-describedby='transition-modal-description'
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                     timeout: 500,
                  }}
               >
                  <Fade in={open}>
                     <div className={classes.paper}>
                        {addType == 'exp' ? (
                           <AddExperienceForm handleClose={handleClose} />
                        ) : addType == 'edu' ? (
                           <AddEducationForm handleClose={handleClose} />
                        ) : addType == 'createProfile' ? (
                           <CreateProfileForm
                              handleClose={handleClose}
                              modal={true}
                           />
                        ) : (
                           <EditProfileForm
                              handleClose={handleClose}
                              modal={true}
                           />
                        )}
                     </div>
                  </Fade>
               </Modal>
            </div>
         </div>
      </div>
   );
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      profiles: state.profiles,
   };
};
export default connect(mapStateToProp, {
   getMyProfile,
   deleteExperience,
   deleteEducation,
})(Dashboard);
