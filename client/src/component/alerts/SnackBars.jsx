import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { setSnack, removeSnack } from '../redux/action/alerts';

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
}));

function MySnackbar({ snackAlert, setSnack, removeSnack }) {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

   const handleClick = () => {
      setOpen(true);
      setSnack('registeration completed', 'success');
   };

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      // setOpen(false);
      removeSnack(false);
   };

   return (
      <div className={classes.root}>
         <Snackbar
            open={snackAlert.open}
            autoHideDuration={2000}
            onClose={handleClose}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         >
            {snackAlert && (
               <Alert onClose={handleClose} severity={snackAlert.type}>
                  {snackAlert.msg}
               </Alert>
            )}
         </Snackbar>
      </div>
   );
}
const mapStateToProp = (state, ownProps) => {
   return {
      snackAlert: state.alerts.snack,
   };
};
export default connect(mapStateToProp, { setSnack, removeSnack })(MySnackbar);
