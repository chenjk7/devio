import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      maxWidth: 360,
   },
   tagTitle: {
      fontWeight: 'bold',
   },
   list: {
      overflow: 'hidden',
      height: '400px',
      '&:hover': {
         overflow: 'auto',
      },
   },
   LinkBTN: theme.LinkBTN,
}));

const PopularLinks = () => {
   const classes = useStyles();
   const [selectedIndex, setSelectedIndex] = React.useState(1);

   const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
   };

   const Links = [
      { 'Tech News world': 'https://www.technewsworld.com/' },
      { CNET: 'https://www.cnet.com/news/' },
      { 'The Verge': 'https://www.theverge.com/tech' },
      { 'Tech Crunch': 'https://techcrunch.com/' },
      { Engadget: 'https://www.engadget.com/' },
      { Arstechnica: 'https://arstechnica.com/' },
      { Thenextweb: 'https://thenextweb.com/' },
      { 'Developer-tech': 'https://developer-tech.com/' },
      { Geeksforgeeks: 'https://www.geeksforgeeks.org/' },
      { Dzone: 'https://dzone.com/' },
      { W3schools: 'https://www.w3schools.com/' },
      { Stackoverflow: 'https://stackoverflow.com/' },
   ];

   return (
      <div className={classes.root}>
         <Typography className={classes.tagTitle} variant="h6">
            Popular Links
         </Typography>

         <List className={classes.list}>
            {Links.map((link, index) => (
               <ListItem
                  key={index}
                  button
                  onClick={(event) =>
                     (window.location.href = Object.values(link))
                  }
               >
                  {Object.keys(link)}
               </ListItem>
            ))}
         </List>
      </div>
   );
};

PopularLinks.propTypes = {};

export default PopularLinks;
