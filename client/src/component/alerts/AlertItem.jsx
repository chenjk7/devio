import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { removeAlert } from '../redux/action/alerts';

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(2),
   },
}));

function AlertItem({ alert, removeAlert }) {
   const classes = useStyles();
   const [open, setOpen] = React.useState(true);
   setTimeout(() => {
      setOpen(false);
   }, 2000);
   return (
      <Fragment>
         <Alert
            className={classes.root}
            severity={alert.type}
            action={
               <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                     // setOpen(false);
                     removeAlert(alert.id);
                  }}
               >
                  <CloseIcon fontSize="inherit" />
               </IconButton>
            }
         >
            {alert.msg}
         </Alert>
      </Fragment>
   );
}
export default connect(null, { removeAlert })(AlertItem);
