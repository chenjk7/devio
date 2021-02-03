import React from 'react';
import { connect } from 'react-redux';
import DeveloperFollowsItem from './DeveloperFollowsItem';
import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(2),
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },

   container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2),
      '& > div': {
         flex: '0 50%',
      },
      [theme.breakpoints.down('sm')]: {
         '& > div': {
            flex: '100%',
         },
      },
   },
   textwrap: {
      wordWrap: 'anywhere',
   },
}));

const DeveloperFollows = ({ profile }) => {
   // const { loading, profile } = profiles;
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <Typography
            className={classes.title}
            // color="textSecondary"
            gutterBottom
         >
            Following
         </Typography>
         <div className={classes.container}>
            {profile &&
               profile.follows &&
               profile.follows.map((user, indx) => (
                  <DeveloperFollowsItem
                     key={indx}
                     user={user}
                     profile={profile}
                  />
               ))}
         </div>
      </div>
   );
};

export default DeveloperFollows;
