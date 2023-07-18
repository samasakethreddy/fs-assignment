const Model = require('../models/userSchema');

async function getUser(data){
    try {
        const user = await Model.find({_id:data});
        return user;  
    } catch (error) {
        throw error;
    }
}

async function postUser(data){
    try {
        const newUser = await Model.create({
            name:data.name,
            email:data.email,
            password:data.password
        });
        return newUser;   
    } catch (error) {
        throw error;
    }
}

async function putUser(id,data){
    try {
        const updatedUser = await Model.updateOne({_id:id},{
            name:data.name,
            email:data.email,
            password:data.password
        })
        return updatedUser;     
    } catch (error) {
        throw error;
    }
}

async function deleteUser(data){
    try {
        const deletedUser = await Model.deleteOne({_id:data});
        return deletedUser;     
    } catch (error) {
        throw error;
    }
}

module.exports = {getUser, postUser, putUser, deleteUser}