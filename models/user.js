const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
        type: String,
        required: true
    },
    defaultDay: {
        type: Number,
        required: true,
        default: 0
    }
  },
  { timestamps: true },
);
 
const Users = mongoose.model('Users', userSchema);

module.exports =  Users;