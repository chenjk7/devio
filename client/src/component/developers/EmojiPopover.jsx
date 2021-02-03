import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const useStyles = makeStyles((theme) => ({
   popover: {
      // pointerEvents: "none",
      maxWidth: 1000,
   },
   name: {
      color: '#0600B3',
      fontWeight: 'bold',
   },
   paper: {
      padding: theme.spacing(1),
   },
}));

const EmojiPopover = (props) => {
   const { handleAddEmoji } = props;
   const handlePopoverOpen = async (event) => {
      //get profile by id
      setAnchorEl(event.currentTarget);
   };
   const [emoji, addEmoji] = useState('');
   const handlePopoverClose = () => {
      // setOpen(false);
      setAnchorEl(null);
   };
   const handleEmoji = (emo) => {
      setAnchorEl(null);
      handleAddEmoji(emo.native);
   };
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   // const [open, setOpen] = useState(false);
   const open = Boolean(anchorEl);
   const popoverContent = (
      <Popover
         id="mouse-over-popover"
         className={classes.popover}
         classes={{
            paper: classes.paper,
         }}
         open={open}
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
         }}
         transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
         }}
         onClose={handlePopoverClose}
         // disableRestoreFocus
      >
         <Picker onSelect={handleEmoji} />
      </Popover>
   );

   return (
      <Fragment>
         <span onClick={handlePopoverOpen} className={classes.name}>
            {props.children}
         </span>

         {popoverContent}
      </Fragment>
   );
};

EmojiPopover.propTypes = {};

export default EmojiPopover;
