const mongoose = require('mongoose');

module.exports = mongoose.model('Blog', mongoose.Schema({
    title:{type:String},
    content:{type:String},
    usermail:{type:String},
    createdAt:{type:Date,default:Date.now},
    ubdatedAt:{type:Date,defaule:Date.now}
}));