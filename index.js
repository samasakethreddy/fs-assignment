// Import
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// require('dotenv').config();
const registration = require('./src/controllers/registration')
const login = require('./src/controllers/login')
const access = require('./src/controllers/access')
// Middlewares
app.use(express.json());
app.use("/user/registration", registration);
app.use("/user/login", login);
app.use("/user/me", access);


// Database Connection
async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://samasakethreddy:2Vb80xnzzwxrgXTA@cluster0.szjvh9s.mongodb.net/test?retryWrites=true&w=majority');
        console.log('conected to Database...');
    } catch (error) {
        throw error;
    }
}

// Listening on port 3000
app.listen(3000,async ()=>{
    console.log("server started");
    try {
        await connectDB();
    } catch (err) {
        console.log(err);
    }
})
