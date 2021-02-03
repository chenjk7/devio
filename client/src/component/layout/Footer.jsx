import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      textAlign: 'center',
      height: 350,
      backgroundColor: '#0091B3',
      marginBottom: 0,
      marginTop: theme.spacing(5),
      '&>*': {},
      paddingTop: theme.spacing(3),
   },
   footer: {
      padding: '30px auto',
      '& > *': {
         color: 'black',
         fontSize: 16,
         marginTop: theme.spacing(2),
      },
   },
}));
const Footer = () => {
   const classes = useStyles();
   return (
      <Fragment>
         <div className={classes.root}>
            <footer className={classes.footer}>
               <p>&copy; Author: Ken Chen</p>
               <p>
                  <a
                     style={{ fontSize: 18, color: 'black' }}
                     href="https://www.linkedin.com/in/ken-chen-b89b3434/"
                  >
                     <i className="fab fa-linkedin"> Ken Chen</i>
                  </a>
               </p>
               <a href="mailto:hege@example.com">KenChen@example.com</a>
               <div>
                  DEV IO is a software developers community, and social
                  networking site.
               </div>
            </footer>
         </div>
      </Fragment>
   );
};

Footer.propTypes = {};

export default Footer;
