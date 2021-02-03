const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   name: {
      type: String,
      required: true,
   },
   avatar: {
      type: String,
   },
   title: {
      type: String,
      required: true,
   },
   text: {
      type: String,
      require: true,
   },
   likes: [
      {
         user: { type: Schema.Types.ObjectId, ref: 'user' },
      },
   ],
   tags: {
      type: [String],
   },
   comments: [
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
         },
         name: {
            type: String,
            required: true,
         },
         avatar: {
            type: String,
         },
         text: {
            type: String,
            require: true,
         },
         date: {
            type: Date,
            default: Date.now,
         },
      },
   ],
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('post', PostSchema);
