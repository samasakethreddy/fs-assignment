const express = require("express");
const router = express.Router();
const Model = require('../models/userSchema');
const jwt = require("jsonwebtoken")
const jwtSecretKey = "hello";
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
    const user  = await Model.find({email:email});

    if (bcrypt.compareSync(password,user[0].password)){
        res.write("Login successful!!!");
        const token = await jwt.sign({email:email}, jwtSecretKey, { expiresIn: '10s' });
        res.end(token);
    }
    else{
        res.end("Login Unsuccessful!!!");
    }
});

module.exports = router;