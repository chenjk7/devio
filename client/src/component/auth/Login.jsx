import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { loginUser } from '../redux/action/auth';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      // margin: 'auto',

      margin: 'auto',
      maxWidth: 600,
      maxHeight: 700,
      '& > *': {
         margin: theme.spacing(1),
      },
      height: '100vh',
   },
   form: {
      maxhight: 300,
      borderRadius: '25px',
      padding: theme.spacing(2),
      backgroundColor: 'white',
   },
   button: {
      marginBottom: 20,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
         width: '100%',
      },
   },
   Login: {
      marginTop: 20,
      margin: 'auto',
      display: 'flex',
      // width: '100%',
      // padding: 10,
      flexDirection: 'column',
      '&>*': {
         // width: '100%',
         marginBottom: 20,
      },
   },
   LinkBTN: theme.LinkBTN,
}));

function Login({ loginUser, auth: { isAuthenticated } }) {
   const history = useHistory();
   const [formatData, setFormData] = useState({
      email: '',
      password: '',
   });
   const classes = useStyles();
   const onSubmit = (e) => {
      e.preventDefault();
      loginUser(formatData);
   };
   const onChange = (e) => {
      setFormData({ ...formatData, [e.target.name]: e.target.value });
   };
   return (
      <div className={classes.root}>
         {isAuthenticated ? (
            <Redirect to="/dashboard" />
         ) : (
            <form className={classes.form} noValidate autoComplete="off">
               <Typography variant="h4" color="Primary">
                  Sign in
               </Typography>
               <div className={classes.Login}>
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
               </div>
               <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push('/')}
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
      </div>
   );
}
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp, { loginUser })(Login);
