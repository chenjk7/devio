import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Fragment, useEffect, useState, useRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Homepage from '../layout/Homepage';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alerts from '../alerts/Alerts';
import MySnackbar from '../alerts/SnackBars';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Developers from '../developers/Developers';
import Developer from '../developers/Developer';
import CreateProfileForm from '../profiles/CreateProfileForm';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import EditProfile from '../profiles/EditProfile';
import { connect } from 'react-redux';
import CreatePost from '../posts/CreatePost';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      height: '100vh',

      // overflowY: 'scroll',
      position: 'relative',
   },
   homepage: {
      minWidth: 300,
      backgroundColor: '#F4F4F4',
      [theme.breakpoints.up('md')]: {
         display: 'grid',
         gridTemplateColumns:
            'minmax(auto,200px) minmax(1000px,auto) minmax(auto,200px)',
      },
   },
   homepBody: {
      // backgroundColor: 'white',
      // maxWidth: 1200,
      margin: 'auto',
      // marginTop: 'auto',
      padding: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
         // padding: '15px',
         // height: '100vh',
         minHeight: 800,
      },
      [theme.breakpoints.up('md')]: {
         marginTop: 64,
         minHeight: 800,
      },
   },
   register: {
      backgroundColor: '#F4F4F4',
   },
   mediumScreen: {
      [theme.breakpoints.down('md')]: {
         display: 'none',
      },
   },
}));
const Routes = ({ height, onSetHeight, auth: { loading } }) => {
   const classes = useStyles();
   let history = useHistory();
   const Desktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));

   useEffect(() => {
      onSetHeight();
   });
   useEffect(() => {}, [height]);
   return (
      !loading && (
         <Fragment>
            <Grid container className={classes.root}>
               <Hidden lgDown>
                  <Grid item xs={12} lg={2}></Grid>
               </Hidden>
               <Grid
                  item
                  xs={12}
                  lg={8}
                  style={Desktop ? { marginTop: height } : { marginTop: 0 }}
                  className={classes.homepBody}
               >
                  <Alerts />
                  <MySnackbar />
                  <Route exact path='/' component={Homepage} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/developers' component={Developers} />
                  <Route
                     exact
                     path='/developers/:id/:page?'
                     render={(props) => <Developer {...props} key={uuidv4()} />}
                  />
                  <Route
                     exact
                     path='/posts'
                     render={(props) => <Posts {...props} key={uuidv4()} />}
                  />
                  <Route exact path='/Posts/:id' component={Post} />
                  <PrivateRoute
                     exact
                     path='/create-post'
                     component={CreatePost}
                  />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute
                     exact
                     path='/create-profile'
                     redirect={true}
                     component={CreateProfileForm}
                  />
                  <PrivateRoute
                     exact
                     path='/edit-profile'
                     redirect={true}
                     component={EditProfile}
                  />
                  {/* <Footer /> */}
               </Grid>
               <Hidden lgDown>
                  <Grid item xs={12} lg={2}></Grid>
               </Hidden>
               {/* {history.location.pathname != '/' && <Footer />} */}
               <Footer />
            </Grid>
         </Fragment>
      )
   );
};
const mapStateToProp = (state, ownProps) => {
   return {
      auth: state.auth,
   };
};
export default connect(mapStateToProp)(Routes);
