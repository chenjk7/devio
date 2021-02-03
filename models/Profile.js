const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "user",
   },
   status: {
      type: String,
      required: true,
   },
   skills: {
      type: [String],
      required: true,
   },
   contact: {
      email: { type: String },
      phone: { type: String },
   },
   homepage: {
      type: String,
   },
   company: {
      type: String,
   },
   bio: {
      type: String,
   },
   address: {
      type: String,
   },
   github: {
      type: String,
   },
   socialMedia: {
      facebook: {
         type: String,
      },
      linkedin: {
         type: String,
      },
      instagram: {
         type: String,
      },
   },
   cover: {
      type: String,
   },
   follows: [
      {
         user: { type: Schema.Types.ObjectId, ref: "user" },
      },
   ],
   education: [
      {
         school: {
            type: String,
            required: true,
         },
         major: {
            type: String,
            required: true,
         },
         degree: {
            type: String,
            required: true,
         },
         from: {
            type: Date,
            required: true,
         },
         to: {
            type: Date,
         },
         current: {
            type: Boolean,
            default: false,
         },
      },
   ],
   experience: [
      {
         company: {
            type: String,
            required: true,
         },
         title: {
            type: String,
            required: true,
         },
         description: {
            type: String,
         },
         from: {
            type: Date,
            required: true,
         },
         to: {
            type: Date,
         },
         current: {
            type: Boolean,
            default: false,
         },
      },
   ],
});

module.exports = mongoose.model("profile", ProfileSchema);
