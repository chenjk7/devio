import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 345,
      '&:hover': {
         transition: 'ease .5s',
         filter: 'brightness(110%)',
      },
   },
   body: {},
   media: {
      height: 200,
   },
}));
const NewsItem = ({ data }) => {
   const { author, urlToImage, title, description, url } = data;
   const classes = useStyles();
   return (
      <div>
         <Card className={classes.root}>
            <CardActionArea onClick={() => (window.location.href = url)}>
               <CardMedia
                  className={classes.media}
                  image={urlToImage}
                  title={title}
               />
               <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                     {author}
                  </Typography>
                  <Typography
                     variant="body2"
                     color="textSecondary"
                     component="p"
                     className={classes.body}
                  >
                     {description}
                  </Typography>
               </CardContent>
            </CardActionArea>
         </Card>
      </div>
   );
};

NewsItem.propTypes = {};

export default NewsItem;
