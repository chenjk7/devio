const express = require('express');

const connectDB = require('./config/connectDB');
const Logger = require('./util/logger');
const cpUpload = require('./middleware/files');
const app = express();
const path = require('path');
var cors = require('cors');
//set middleware
app.use(express.json({ extended: false }));
app.use(cpUpload);
app.use(cors());

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./api/user'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profile', require('./api/profile'));
app.use('/api/wall', require('./api/userWall'));
app.use('/api/posts', require('./api/post'));
app.use('/api/news', require('./api/news'));

//set static
if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}
process.on('uncaughtException', () => {});
process.on('exit', () => {});
process.on('SIGTERM', () => {});
// start server on a port
app.listen(PORT, () => {
   Logger.log(`Server started on port ${PORT}`, __filename);
});
