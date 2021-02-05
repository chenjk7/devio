import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      // maxWidth: 360,
   },
   LinkTitle: {
      fontWeight: 'bold',
   },
}));
const ExternalLinks = () => {
   const classes = useStyles();
   const [selectedIndex, setSelectedIndex] = React.useState(1);

   const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
   };
   return (
      <div className={classes.root}>
         <Typography className={classes.LinkTitle} variant='h6'>
            External links
         </Typography>
         <List component='nav' aria-label='main mailbox folders'>
            <Tooltip title='My github repo page'>
               <ListItem
                  button
                  onClick={(event) => {
                     handleListItemClick(event, 0);
                     window.location.href = 'https://github.com/chenjk7';
                  }}
               >
                  <ListItemIcon>
                     <GitHubIcon />
                  </ListItemIcon>

                  <ListItemText primary='Github' />
               </ListItem>
            </Tooltip>
            <Tooltip title='My linkedin homepage'>
               <ListItem
                  button
                  onClick={(event) => {
                     handleListItemClick(event, 1);
                     window.location.href =
                        'https://www.linkedin.com/in/ken-chen-b89b3434/';
                  }}
               >
                  <ListItemIcon>
                     <LinkedInIcon />
                  </ListItemIcon>
                  <ListItemText primary='Linkedin' />
               </ListItem>
            </Tooltip>
         </List>
      </div>
   );
};

ExternalLinks.propTypes = {};

export default ExternalLinks;
