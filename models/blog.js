const mongoose = require('mongoose');

module.exports = mongoose.model('Blog', mongoose.Schema({
    title:{type:String},
    content:{type:String},
    usermail:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,defaule:Date.now}
}));