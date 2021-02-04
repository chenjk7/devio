import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { addExperience } from '../redux/action/profiles';
import {
   Typography,
   TextField,
   MenuItem,
   useMediaQuery,
   Button,
   Checkbox,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from 'react-redux';
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(1),
      '& > *': {
         marginTop: theme.spacing(1),
      },
      [theme.breakpoints.down('sm')]: {
         maxWidth: 600,
         maxHeight: 500,
         width: 'auto',
         height: '100%',
         overflow: 'auto',
      },
   },
   form: {
      // margin: 'auto 200px',
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
            margin: theme.spacing(2),
         },
      },
   },
   action: {
      maxWidth: 600,
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

const AddExperienceForm = ({ handleClose, addExperience }) => {
   const classes = useStyles();
   const Desktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
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

   const [info, setInfo] = React.useState({
      company: '',
      title: '',
      description: '',
      from: new Date(),
      to: new Date(),
      current: false,
   });
   const onSubmit = (e) => {
      e.preventDefault();
      addExperience(info, handleClose);
   };
   const [selectedDate, setSelectedDate] = React.useState(new Date());
   const handleDateChange = (date) => {
      setSelectedDate(date);
   };
   const onChange = (e) => {
      setInfo({ ...info, [e.target.name]: e.target.value });
   };
   return (
      <div className={classes.root}>
         <Typography variant={Desktop ? 'h3' : 'h5'} color='primary'>
            Add experience
         </Typography>
         <Typography variant='subtitle1'>
            Add a new work experience or a bootcamp you took
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
               label='Job title'
               required
               value={info.title}
               name='title'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
               helperText='Please select your title'
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
               helperText='Which company you worked for'
               defaultValue=''
               placeholder='company'
               value={info.company}
               name='company'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
            />
            <TextField
               required
               id='standard-required'
               label='Location'
               nane='location'
               helperText=''
               defaultValue=''
               placeholder='location'
               value={info.location}
               name='location'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
            />
            <TextField
               required
               id='standard-required'
               label='Description'
               nane='description'
               helperText=''
               defaultValue=''
               placeholder='description'
               value={info.description}
               name='description'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='From date'
                  name='from'
                  label='From'
                  value={info.from}
                  onChange={(date) => {
                     setInfo({ ...info, from: date });
                  }}
               />
            </MuiPickersUtilsProvider>
            <div>
               Current
               <Checkbox
                  checked={info.current}
                  onChange={(e) => {
                     setInfo({
                        ...info,
                        [e.target.name]: e.target.checked,
                        to: new Date(),
                     });
                  }}
                  name='current'
                  color='primary'
               />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
                  disabled={info.current}
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='To date'
                  label='To'
                  value={info.to}
                  onChange={(date) => {
                     setInfo({ ...info, to: date });
                  }}
               />
            </MuiPickersUtilsProvider>

            <div className={classes.action}>
               <Button variant='contained' type='Submit' color='primary'>
                  Submit
               </Button>
               <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleClose}
               >
                  Cancel
               </Button>
            </div>
         </form>
      </div>
   );
};

AddExperienceForm.propTypes = {};

export default connect(null, { addExperience })(AddExperienceForm);
