const mongoose = require("mongoose");
const { schema } = require("./Users");
const Schema = mongoose.Schema;

const UserWallSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "user",
   },
   posts: [
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: "user",
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
         likes: [
            {
               user: { type: Schema.Types.ObjectId, ref: "user" },
            },
         ],
         comments: [
            {
               user: {
                  type: Schema.Types.ObjectId,
                  ref: "user",
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
      },
   ],
});

module.exports = mongoose.model("userwall", UserWallSchema);
