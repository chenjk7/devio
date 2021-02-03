import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
   progress: {
      width: '100%',
      textAlign: 'center',
   },
}));
const ProgressCir = () => {
   const classes = useStyles();
   return (
      <div className={classes.progress}>
         <CircularProgress className={classes.progress} />
      </div>
   );
};

export default ProgressCir;
