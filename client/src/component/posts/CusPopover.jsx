import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Developersitem from '../developers/Developersitem';
const useStyles = makeStyles((theme) => ({
   popover: {
      pointerEvents: 'none',
      maxWidth: 1000,
   },
   name: {
      color: '#0600B3',
      fontWeight: 'bold',
   },
}));

const CusPopover = (props) => {
   const { type, link, name } = props;

   const [postUserProfile, setPostUserProfile] = useState({});
   const handlePopoverOpen = async (event) => {
      //get profile by id
      setAnchorEl(event.currentTarget);
      try {
         if (type == 'profile') {
            const res = await axios.get(link);
            // setOpen(true);
            setPostUserProfile(res.data);
         }
      } catch (error) {
         setPostUserProfile(null);
         // setOpen(true);
      }
   };

   const handlePopoverClose = () => {
      // setOpen(false);
      setAnchorEl(null);
   };

   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   // const [open, setOpen] = useState(false);
   const open = Boolean(anchorEl);
   const popoverContent =
      postUserProfile != null && postUserProfile != {} ? (
         <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
               paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
         >
            {postUserProfile.user && (
               <Developersitem profile={postUserProfile} />
            )}
         </Popover>
      ) : (
         <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
               paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
         >
            Profile is not found
         </Popover>
      );
   return (
      <Fragment>
         <span
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}
            onMouseLeave={handlePopoverClose}
            className={classes.name}
         >
            {name}
            {props.children}
         </span>
         {popoverContent}
      </Fragment>
   );
};

CusPopover.propTypes = {};

export default CusPopover;
