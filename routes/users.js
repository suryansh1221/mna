const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require('cors');

// const keys = require("../../config/keys");
// Load input validation
// const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("./login");
const Users = require("../models/user");

// Load User x  
// const User = require("../../models/User");

router.post('/login', cors(), (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body);
  // console.log(errors)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ username: email }).then(user => {
    // Check if user exists
    
    if (!user) {
      // console.log(user)
      errors={ email: "Invalid credentials" }
      return res.status(404).json(errors);
    }
    // console.log(user.password==password)
    if(user.password == password)return res.status(200).json({message: 'success'})
    else return res.status(404).json({message: 'failed'})
  })
})

router.post('/register', cors(), (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body);
  // console.log(errors)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  Users.collection.insert({username: email, password: password}).then(res => {
    
  }).catch(err => {
    return res.status(404).json(err)
  })
  return res.status(200).json({message: 'success'})
})
module.exports = router