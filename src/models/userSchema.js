const mongoose = require('mongoose');

// Schemas
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
},{ collection : 'models' })

// Mongoose model
const Model =  mongoose.model('Model',userSchema);

module.exports = Model;