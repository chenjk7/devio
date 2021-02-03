const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
   name: {
      type: String,
      require: true,
   },
   email: {
      type: String,
      require: true,
      uniqure: true,
   },
   password: {
      type: String,
      uniqure: true,
   },
   avatar: {
      type: String,
   },
   date: {
      type: Date,
      default: Date.now(),
   },
});

module.exports = mongoose.model("user", UsersSchema);
