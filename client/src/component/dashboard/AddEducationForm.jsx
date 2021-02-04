import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
   Typography,
   TextField,
   MenuItem,
   useMediaQuery,
   Button,
   Checkbox,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from '@material-ui/pickers';
import { addEducation } from '../redux/action/profiles';
import { connect } from 'react-redux';

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

const AddEducationForm = ({ handleClose, addEducation }) => {
   const classes = useStyles();
   const Desktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

   const [info, setInfo] = React.useState({
      school: '',
      major: '',
      degree: '',
      from: new Date(),
      to: new Date(),
      current: false,
   });
   const onSubmit = (e) => {
      e.preventDefault();
      addEducation(info, handleClose);
   };
   const [selectedDate, setSelectedDate] = React.useState();
   const handleDateChange = (date) => {
      setSelectedDate(date);
   };
   const onChange = (e) => {
      setInfo({ ...info, [e.target.name]: e.target.value });
   };
   const degreeList = [
      'Associate degree',
      'Professional Certificates',
      'Undergraduate Degrees',
      'Bachelor Degrees',
      'Master Degrees',
      'Professional Degrees',
      'Specialist Degrees',
   ];
   return (
      <div className={classes.root}>
         <Typography variant={Desktop ? 'h3' : 'h5'} color='primary'>
            Add education
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
               required
               id='standard-required'
               label='School'
               nane='school'
               helperText=''
               defaultValue=''
               placeholder='what is the school name'
               value={info.school}
               name='school'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
            />
            <TextField
               required
               id='standard-required'
               label='Major'
               nane='major'
               helperText=''
               defaultValue=''
               placeholder='What is your major'
               value={info.major}
               name='major'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
            />
            <TextField
               select
               label='Degree'
               required
               nane='degree'
               value={info.degree}
               name='degree'
               onChange={(e) =>
                  setInfo({ ...info, [e.target.name]: e.target.value })
               }
               helperText='Please select your degree'
            >
               {degreeList.map((option, index) => (
                  <MenuItem key={index} value={option}>
                     {option}
                  </MenuItem>
               ))}
            </TextField>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='From date'
                  name='from'
                  label='from'
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

AddEducationForm.propTypes = {};

export default connect(null, { addEducation })(AddEducationForm);
