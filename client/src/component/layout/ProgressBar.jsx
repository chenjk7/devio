import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
      position: 'fixed',
      zIndex: 1,
      bottom: 0,
      left: 0,
      // marginTop: 64,
   },
}));

export default function ProgressBar() {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <LinearProgress />
      </div>
   );
}
