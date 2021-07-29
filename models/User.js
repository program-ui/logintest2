// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require('mongoose');
const userSchema = mongoose.Schema
const user = new userSchema({
  username: {
    type: String,
    required: true,
   },
   email: {
   type: String,
   required: true,
   unique: true,
   },
   password: {
   type: String,
   required: true,
   },
   
})

module.exports = mongoose.model('User', user)