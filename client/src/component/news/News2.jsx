import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import InfiniteScroll from 'react-infinite-scroll-component';
const useStyles = makeStyles({
   root: {
      maxWidth: 345,

      // backgroundColor: '#E9F0F1',
   },
   newlist: {
      '& > *': {
         padding: 10,
      },
   },
   Title: {
      fontWeight: 'bold',
   },
   moreBtn: {
      // margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
   },
});

const style = {
   height: 30,
   border: '1px solid green',
   margin: 6,
   padding: 8,
};
const News = () => {
   const [data, setData] = useState([]);
   const [count, setCount] = useState(5);
   const [items, setItem] = useState([]);

   useEffect(() => {
      async function fetchdata() {
         var url =
            'http://newsapi.org/v2/everything?' +
            'q=Apple&' +
            'from=2020-12-04&' +
            'sortBy=popularity&' +
            'apiKey=';
         const res = await axios.get(url);
         setData(res.data.articles);
         setItem(res.data.articles.slice(0, 5));
      }
      fetchdata();
   }, []);

   const SetDisplayCount = () => {
      if (count + 5 > data.length) {
         setCount(data.length);
      } else {
         setCount(count + 5);
      }
   };
   const classes = useStyles();

   const fetchMoreData = () => {
      // a fake async api call like which sends
      // 20 more records in 1.5 secs
      setTimeout(() => {
         // setItem(items.concat(Array.from({ length: 20 })));
         // SetDisplayCount();
         if (items.length + 5 > data.length) {
            setItem(data);
         } else {
            setItem(data.slice(0, items.length + 5));
         }
      }, 1000);
   };
   return (
      <div className={classes.root}>
         <Typography className={classes.Title} variant="h6">
            News
         </Typography>
         <div className={classes.newlist}>
            <InfiniteScroll
               dataLength={items.length}
               next={fetchMoreData}
               hasMore={true}
               loader={<h4>Loading...</h4>}
            >
               {items.map((data) => (
                  <Fragment>
                     <NewsItem data={data} />
                  </Fragment>
               ))}
            </InfiniteScroll>
         </div>

         {/* {count != data.length ? (
            <div className={classes.moreBtn}>
               <IconButton onClick={SetDisplayCount}>
                  More
                  <MoreHorizIcon />
               </IconButton>
            </div>
         ) : (
            ''
         )} */}
      </div>
   );
};

News.propTypes = {};

export default News;
