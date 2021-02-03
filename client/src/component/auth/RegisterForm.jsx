import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { regsterUser } from '../redux/action/auth';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      margin: 'auto',
      maxWidth: 600,
      '& > *': {
         // margin: theme.spacing(1),
      },
      [theme.breakpoints.up('md')]: {
         width: '100%',
      },
      padding: theme.spacing(2),
      borderRadius: '25px',
      backgroundColor: 'white',
   },
   button: {
      marginBottom: 20,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
         width: '100%',
      },
   },
   registerForm: {
      margin: 'auto',
      display: 'flex',
      width: '100%',
      // padding: 10,
      marginTop: 20,
      flexDirection: 'column',
      '&>*': {
         // width: '100%',
         marginBottom: 20,
      },
   },
   LinkBTN: theme.LinkBTN,
}));

function RegisterForm({ regsterUser, auth: { isAuthenticated } }) {
   const [formatData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
   });
   const classes = useStyles();
   const onSubmit = (e) => {
      e.preventDefault();
      regsterUser(formatData);
   };
   const onChange = (e) => {
      setFormData({ ...formatData, [e.target.name]: e.target.value });
   };
   return (
      <Fragment>
         {isAuthenticated ? (
            <div>Register completed</div>
         ) : (
            <form className={classes.root} noValidate autoComplete="off">
               <Typography variant="h4" color="Primary">
                  Sign up
               </Typography>
               <div className={classes.registerForm}>
                  <TextField
                     id="standard-basic"
                     label="Name"
                     name="name"
                     type="text"
                     value={formatData.name}
                     onChange={onChange}
                  />
                  <TextField
                     id="standard-basic"
                     label="email"
                     type="email"
                     name="email"
                     value={formatData.email}
                     onChange={onChange}
                  />
                  <TextField
                     id="standard-basic"
                     label="password"
                     type="password"
                     name="password"
                     value={formatData.password}
                     onChange={onChange}
                  />
                  <TextField
                     id="standard-basic"
                     label="password"
                     type="password"
                     name="password2"
                     value={formatData.password2}
                     onChange={onChange}
                  />
               </div>
               <Button
                  variant="contained"
                  color="secondary"
                  href="/"
                  className={classes.button}
               >
                  Cancel
               </Button>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                  className={classes.button}
               >
                  Submit
               </Button>
            </form>
         )}
      </Fragment>
   );
}
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { regsterUser })(RegisterForm);
