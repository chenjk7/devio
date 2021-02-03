import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Posts from '../posts/Posts';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ExternalLinks from './ExternalLinks';
import TagsList from './TagsList';
import News from '../news/News';
import PopularLinks from './PopularLinks';

const useStyles = makeStyles((theme) => ({
   main: {},
   root: {
      flexGrow: 1,
      // height: '100vh',
      padding: theme.spacing(2),
   },
   paper: {
      height: 140,
      width: 100,
   },
   control: {
      padding: theme.spacing(2),
   },
   mobile: {
      [theme.breakpoints.down('sm')]: {
         display: 'none',
      },
      '&>*': {
         marginBottom: '20px',
      },
   },
}));
const Homepage = ({ history }) => {
   const [spacing, setSpacing] = React.useState(2);
   const classes = useStyles();

   const handleChange = (event) => {
      setSpacing(Number(event.target.value));
   };
   return (
      <div className={classes.main}>
         <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} md={3} className={classes.mobile}>
               <ExternalLinks />
               <Divider />
               <PopularLinks />
            </Grid>
            <Grid item xs={12} md={6}>
               <Posts />
            </Grid>
            <Grid item xs={12} md={3} className={classes.mobile}>
               <News />
            </Grid>
         </Grid>
      </div>
   );
};

Homepage.propTypes = {};

export default Homepage;
