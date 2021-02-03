import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import axios from 'axios';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
const { NEWS_API_KEY } = require('../../config/default');
const moment = require('moment');
const useStyles = makeStyles({
   root: {
      // width: 300,
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
   more: {
      borderRadius: 8,
      width: '100%',
   },
});
const News = () => {
   const [data, setData] = useState([]);
   const [count, setCount] = useState(5);
   useEffect(() => {
      async function fetchdata() {
         const config = {
            headers: {
               'x-api-key': '0836727151zh5u3somom2rclh',
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods':
                  'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
         };
         const Today = moment(Date.now()).format('YYYY-MM-DD');
         var url =
            'https://fast-reef-29063.herokuapp.com/http://newsapi.org/v2/everything?' +
            'q=programming&tech' +
            `from=${Today}&` +
            'sortBy=popularity&' +
            `apiKey=${NEWS_API_KEY}`;
         // const res = await axios.get(url);
         // setData(res.data.articles);
         const res = await axios.get('/api/news');
         setData(res.data);
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
   return (
      <div className={classes.root}>
         <Typography className={classes.Title} variant="h6">
            News
         </Typography>
         <div className={classes.newlist}>
            {data.slice(0, count).map((data, index) => (
               <NewsItem key={index} data={data} />
            ))}
         </div>
         {count != data.length ? (
            <div className={classes.moreBtn}>
               <IconButton onClick={SetDisplayCount} className={classes.more}>
                  More
                  <MoreHorizIcon />
               </IconButton>
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

News.propTypes = {};

export default News;
