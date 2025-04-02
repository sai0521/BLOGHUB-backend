const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    name:{type:String},
    usermail:{type:String , unique:true , required:true},
    password:{type:String}
}));