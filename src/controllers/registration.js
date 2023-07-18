const express = require("express");
const router = express.Router();
const Model = require('../models/userSchema');
const bcrypt = require('bcrypt');

router.post("/",async (req,res)=>{
    const name = req.body['name'];
    const email = req.body['email'];
    const password = req.body['password'];
    try{
        const record = await Model.findOne({email:email})
        if (record) {
            res.send('Record exists!');
          } else {
                    //Hashing the Password
                    let saltRounds=10;
                    let salt = bcrypt.genSaltSync(saltRounds)
                    const hashedPassword = await  bcrypt.hashSync(password,salt);
                    const newUser = await Model.create({
                        name:name,
                        email:email,
                        password:hashedPassword
                    });
                    res.send(newUser)                     
          }
    }
    catch(err){
        console.log('Error:', err);
    }
});

module.exports = router;