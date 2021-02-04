import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createProfile, getMyProfile } from '../redux/action/profiles';
import { useHistory } from 'react-router-dom';
import {
   Typography,
   TextField,
   MenuItem,
   Hidden,
   useMediaQuery,
   FormControlLabel,
   Chip,
   Fade,
   Switch,
   Button,
   Collapse,
} from '@material-ui/core';
import Options from '../taglist';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
   root: {
      // maxHeight: 800,
      // overflowY: "auto",
      // overflowX: "hidden",
      padding: theme.spacing(1),
      '& > *': {
         marginTop: theme.spacing(1),
      },
      [theme.breakpoints.down('sm')]: {
         // maxWidth: 600,
         // maxHeight: 500,
         width: 'auto',
         height: '90%',
         overflow: 'auto',
      },
   },
   modalRoot: {
      maxHeight: 800,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: theme.spacing(1),
      '& > *': {
         marginTop: theme.spacing(1),
      },
      [theme.breakpoints.down('sm')]: {
         maxWidth: 600,
         maxHeight: 500,
         width: 'auto',
         height: '90%',
         overflow: 'auto',
      },
   },
   form: {
      '& >*': {
         margin: theme.spacing(1),
      },
      '& > *': {
         width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
         margin: 'auto',
         '& > *': {
            width: '95%',
            marginTop: theme.spacing(3),
            margin: theme.spacing(2),
         },
      },
   },
   socialMeida: {
      display: 'flex',
      flexDirection: 'column',
      // margin: 'auto 200px',
      '& *': {
         margin: theme.spacing(1),
         marginTop: theme.spacing(3),
      },

      [theme.breakpoints.down('sm')]: {
         margin: 'auto',
         '& > .': {
            width: '95%',
            marginTop: theme.spacing(3),
            margin: theme.spacing(2),
         },
      },
   },
   sociaMediaHead: {
      display: 'flex',
      '& >*': {
         marginRight: theme.spacing(2),
      },
   },
   action: {
      [theme.breakpoints.down('sm')]: {
         width: '95%',
         '& > *': {
            width: '100%',
         },
         float: 'none',
      },
      '& > *': {
         float: 'right',
         margin: theme.spacing(1),
      },
   },
}));
const EditProfileForm = ({
   auth,
   createProfile,
   redirect,
   getMyProfile,
   profiles: { profile, loading },
   handleClose,
   handhleGoBack,
   modal,
}) => {
   const history = useHistory();
   const classes = useStyles();
   const Desktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
   const [checked, setChecked] = React.useState(false);

   const handleShow = () => {
      setChecked((prev) => !prev);
   };
   const positions = [
      'Senior developers',
      'Junior developer',
      'Team leader',
      'Manager',
      'Intern',
      'Instructor',
      'Freelance',
      'Other',
   ];
   const handleChange = (event) => {
      setPosition(event.target.value);
   };
   const [info, setInfo] = React.useState({
      email: '',
      phone: '',
      homepage: '',
      company: '',
      bio: '',
      address: '',
      github: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      skills: [],
      status: '',
   });

   useEffect(() => {
      getMyProfile();
      setInfo({
         email: !loading && profile.contact ? profile.contact.email : '',
         phone: !loading && profile.contact ? profile.contact.phone : '',
         homepage: !loading && profile.homepage,
         company: !loading && profile.company,
         bio: !loading && profile.bio,
         address: !loading && profile.address,
         github: !loading && profile.github,
         facebook:
            !loading && profile.socialMedia ? profile.socialMedia.facebook : '',
         linkedin:
            !loading && profile.socialMedia ? profile.socialMedia.linkedin : '',
         instagram:
            !loading && profile.socialMedia
               ? profile.socialMedia.instagram
               : '',
         skills: !loading && profile.skills,
         status: !loading && profile.status,
      });
   }, [loading]);

   const [position, setPosition] = React.useState('');
   const {
      skills,
      _id,
      user,
      status,
      contact,
      homepage,
      company,
      github,
      bio,
      socialMedia,
      address,
   } = profile || {};

   const onSubmit = (e) => {
      e.preventDefault();
      if (handhleGoBack) {
         createProfile(info, false, null, true, handhleGoBack);
      } else {
         createProfile(info, false, null, true, handleClose);
      }
      // window.scrollTo(0, 0);
   };
   return (
      !loading &&
      profile && (
         <div className={modal ? classes.modalRoot : classes.root}>
            <Typography variant={Desktop ? 'h3' : 'h5'} color='primary'>
               Edit your user profile
            </Typography>
            <Typography variant='subtitle1'>
               Set up your profile, let the community know more about yourself
            </Typography>
            <Typography color='textSecondary' variant='p'>
               * is required field
            </Typography>
            <form
               className={classes.form}
               noValidate
               autoComplete='off'
               onSubmit={onSubmit}
            >
               <TextField
                  select
                  label='Job Status'
                  required
                  value={info.status}
                  name='status'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
                  helperText='Please select your currency'
               >
                  {positions.map((option, index) => (
                     <MenuItem key={index} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </TextField>

               <TextField
                  required
                  id='standard-required'
                  label='Company'
                  nane='company'
                  helperText='Which company you current work for or own a company'
                  defaultValue=''
                  placeholder='company'
                  value={info.company}
                  name='company'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <Autocomplete
                  multiple
                  id='tags-filled'
                  options={Options.map((option) => option)}
                  defaultValue={info.skills}
                  freeSolo
                  value={info.skills}
                  name='skills'
                  onChange={(e, newValue) => {
                     // onSetHeight();
                     // setSkills([...newValue]);
                     setInfo({ ...info, skills: [...newValue] });
                  }}
                  renderTags={(value, getTagProps) =>
                     value.map((option, index) => (
                        <Chip
                           variant='outlined'
                           label={option}
                           {...getTagProps({ index })}
                        />
                     ))
                  }
                  renderInput={(params) => (
                     <TextField
                        required
                        {...params}
                        label='Skills'
                        placeholder='Choose from the list, or enter a skill'
                     />
                  )}
               />

               <TextField
                  id='standard-required'
                  label='email'
                  nane='email'
                  helperText=''
                  defaultValue=''
                  placeholder='email'
                  value={info.email}
                  name='email'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <TextField
                  id='standard-required'
                  label='phone'
                  nane='phone'
                  helperText=''
                  defaultValue=''
                  placeholder='phone'
                  value={info.phone}
                  name='phone'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <TextField
                  id='standard-required'
                  label='homepage'
                  nane='homepage'
                  helperText=''
                  defaultValue=''
                  placeholder='homepage'
                  value={info.homepage}
                  name='homepage'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <TextField
                  id='standard-required'
                  label='Bio'
                  multiline
                  nane='bio'
                  helperText=''
                  defaultValue=''
                  placeholder='Tell us about yourself'
                  value={info.bio}
                  name='bio'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <TextField
                  id='standard-required'
                  label='Location'
                  nane='address'
                  helperText=''
                  defaultValue=''
                  placeholder='Location or address'
                  value={info.address}
                  name='address'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <TextField
                  id='standard-required'
                  label='github'
                  nane='github'
                  helperText=''
                  defaultValue=''
                  placeholder='github'
                  value={info.github}
                  name='github'
                  onChange={(e) =>
                     setInfo({ ...info, [e.target.name]: e.target.value })
                  }
               />
               <div className={classes.sociaMediaHead}>
                  <Typography color='primary' variant='h5'>
                     Soical Media
                  </Typography>
                  <FormControlLabel
                     control={
                        <Switch checked={checked} onChange={handleShow} />
                     }
                     label='Show'
                  />
               </div>
               <Collapse in={checked}>
                  <div className={classes.socialMeida}>
                     <TextField
                        id='standard-required'
                        label='Facebook'
                        nane='facebook'
                        helperText=''
                        defaultValue=''
                        placeholder='facebook'
                        value={info.facebook}
                        name='facebook'
                        onChange={(e) =>
                           setInfo({ ...info, [e.target.name]: e.target.value })
                        }
                     />
                     <TextField
                        id='standard-required'
                        label='Linkedin'
                        nane='linkedin'
                        helperText=''
                        defaultValue=''
                        placeholder='linkedin'
                        value={info.linkedin}
                        name='linkedin'
                        onChange={(e) =>
                           setInfo({ ...info, [e.target.name]: e.target.value })
                        }
                     />
                     <TextField
                        id='standard-required'
                        label='Instagram'
                        nane='instagram'
                        helperText=''
                        defaultValue=''
                        placeholder='instagram'
                        value={info.instagram}
                        name='instagram'
                        onChange={(e) =>
                           setInfo({ ...info, [e.target.name]: e.target.value })
                        }
                     />
                  </div>
               </Collapse>
               <div className={classes.action}>
                  <Button variant='contained' type='Submit' color='primary'>
                     Submit
                  </Button>
                  <Button
                     variant='contained'
                     color='secondary'
                     onClick={() => {
                        if (handhleGoBack) {
                           handhleGoBack();
                        } else {
                           handleClose();
                        }
                     }}
                  >
                     Cancel
                  </Button>
               </div>
            </form>
         </div>
      )
   );
};

EditProfileForm.propTypes = {
   auth: PropTypes.object.isRequired,
   profiles: PropTypes.object.isRequired,
   createProfile: PropTypes.func.isRequired,
   getMyProfile: PropTypes.func.isRequired,
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
      profiles: state.profiles,
   };
};

export default connect(mapStateToProp, { createProfile, getMyProfile })(
   EditProfileForm
);
