import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AlertItem from './AlertItem';
import { connect } from 'react-redux';
import { setAlert, removeAlert } from '../redux/action/alerts';

const useStyles = makeStyles((theme) => ({
   root: {},
}));

function Alerts({ alerts, setAlert, removeAlert }) {
   const classes = useStyles();
   const [open, setOpen] = React.useState(true);
   // setTimeout(() => {
   //    setOpen(false);
   // }, 3000);
   // setTimeout(() => {
   //    alerts.forEach((alert) => {
   //       removeAlert(alert.id);
   //    });
   // }, 4000);
   // const [open, setOpen] = React.useState(true);

   // const handleClick = () => {
   //    // setOpen(true);
   //    setAlert('error in open', 'error');
   // };

   // const handleClose = (event, reason) => {
   //    if (reason === 'clickaway') {
   //       return;
   //    }

   //    setOpen(false);
   // };

   return (
      <div className={classes.root}>
         {/* <Collapse in={true}> */}
         {alerts.map((alert) => {
            return <AlertItem key={alert.id} alert={alert} />;
         })}
         {/* </Collapse> */}
      </div>
   );
}

const mapStateToProp = (state, ownProps) => {
   return {
      alerts: state.alerts.alerts,
   };
};
export default connect(mapStateToProp, { setAlert, removeAlert })(Alerts);
