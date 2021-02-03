const mongoose = require('mongoose');
const Logger = require('../util/logger');

const db = require('./default');

module.exports = async function () {
   try {
      await mongoose.connect(db.mongodb, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      });
      Logger.log('Mongo DB connected', __filename);
   } catch (error) {
      Logger.error(`Connect DB fails: ${error.message}`);
      process.exit(1);
   }
};
