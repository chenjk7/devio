module.exports = {
   mongodb: `mongodb+srv://${process.env.mongoDB_ID}:${process.env.mongoDB_key}@devio.tyqca.mongodb.net/devioDBs?retryWrites=true&w=majority`,
   jwtToken: process.env.jwtToken,
   PaginationCnt: 7,
   AWS_ID: process.env.AWS_ID,
   AWS_KEY: process.env.AWS_KEY,
   AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
   NEWS_API_KEY: process.env.NEWS_API_KEY,
};
