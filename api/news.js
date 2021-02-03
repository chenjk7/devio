const express = require('express');
const { NEWS_API_KEY } = require('../config/default');
const router = express.Router();
const axios = require('axios').default;
const Logger = require('../util/logger');
const moment = require('moment');
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/news
@desc    get news
@access  Public
******************************************************************************/
router.get('/', async (req, res) => {
   try {
      const Today = moment(Date.now()).format('YYYY-MM-DD');
      let url =
         'http://newsapi.org/v2/everything?' +
         'q=programming&tech' +
         `from=${Today}&` +
         'sortBy=popularity&' +
         `apiKey=${NEWS_API_KEY}`;

      const results = await axios.get(url);

      if (!results) {
         return res.status().json({ errors: [{ msg: 'No news' }] });
      }
      res.json(results.data.articles);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json([{ msg: 'Server error' }]);
   }
});

module.exports = router;
