const express = require("express");
const router = express.Router();
const Model = require('../models/userSchema');
const jwt = require("jsonwebtoken")
const jwtSecretKey = "hello";

router.get("/",(req,res)=>{
    const token = req.body['token'];
    jwt.verify(token,jwtSecretKey,(err,decodedToken)=>{
        if(err){
            res.send("Error occured !!!")
        }
        else{
            if(decodedToken){
                res.write("Token Verified !!!");
                res.end(decodedToken);
            }
            else{
                res.send("Unauthorized !!!");
            }
        }
    })
})

module.exports = router;