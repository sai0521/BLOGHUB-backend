const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'] },
    content: { type: String, required: [true, 'Content is required'] },
    email: { 
      type: String, 
      required: [true, 'User email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Blog',blogSchema);