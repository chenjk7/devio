import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Options from '../taglist';

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
}));
const TagsList = () => {
   const classes = useStyles();
   const [selectedIndex, setSelectedIndex] = React.useState(1);

   const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
   };
   return (
      <div className={classes.root}>
         <Typography className={classes.tagTitle} variant="h6">
            Popular Tags
         </Typography>

         <List className={classes.list}>
            {Options.map((tag, index) => (
               <ListItem
                  key={index}
                  button
                  onClick={(event) => handleListItemClick(event, index)}
               >
                  {tag}
               </ListItem>
            ))}
         </List>
      </div>
   );
};

TagsList.propTypes = {};

export default TagsList;
