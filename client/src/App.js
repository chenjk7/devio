import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './component/redux/index';
import { Fragment, useEffect, useState, useRef } from 'react';
import Navbar from './component/layout/Navbar';
import { CssBaseline } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { fade, makeStyles } from '@material-ui/core/styles';
import Homepage from './component/layout/Homepage';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme';
import { loadUser } from './component/redux/action/auth';
import setToken from './component/util/setToken';
import Grid from '@material-ui/core/Grid';
import Alerts from './component/alerts/Alerts';
import MySnackbar from './component/alerts/SnackBars';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Routes from './component/layout/Routes';
import Footer from './component/layout/Footer';
import ScrollToTop from './component/util/ScrollToTop';
// import ScrollToTopOnMount from './component/util/ScrollToTopOnMount';
// import DetectBrowserBack from './component/util/DetectBrowserBack';

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
            'minmax(auto,200px) minmax(960px,auto) minmax(auto,200px)',
      },
   },
   homepBody: {
      // backgroundColor: 'white',
      maxWidth: 1000,
      margin: 'auto',
      marginTop: 'auto',
      [theme.breakpoints.down('md')]: {
         // padding: '15px',
         // height: '100vh',
      },
      [theme.breakpoints.up('md')]: {
         marginTop: 56,
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
setToken(localStorage.getItem('token'));
function App() {
   const classes = useStyles();
   const [height, setHeight] = useState(64);
   useEffect(() => {
      //on mount
      store.dispatch(loadUser());
   }, []);
   const heightRef = useRef(null);
   // const desktopScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
   const onSetHeight = () => {
      const height = document.getElementById('Navbar').clientHeight;

      setHeight(height);
   };
   const customHistory = createBrowserHistory();
   return (
      <ThemeProvider theme={theme}>
         <Provider store={store}>
            <Router history={customHistory}>
               <CssBaseline />
               <Navbar onSetHeight={onSetHeight} />
               <ScrollToTop />
               {/* <ScrollToTopOnMount /> */}
               <Switch>
                  <Routes height={height} onSetHeight={onSetHeight} />
                  {/* <div className={classes.homepage}>
                        <div></div>
                        <div className={classes.homepBody}>
                           <Route exact path="/" component={Homepage} />
                           <Route exact path="/login" component={Login} />
                           <Route exact path="/register" component={Register} />
                        </div>
                        <div></div>
                     </div> */}
               </Switch>
            </Router>
         </Provider>
      </ThemeProvider>
   );
}

export default App;
