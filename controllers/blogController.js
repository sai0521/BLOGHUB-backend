const Blog = require('../models/blog');
const mongoose = require('mongoose');

exports.getUserBlogs = async (req, res) => {
    try {
      if (!req.user?.email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      const blogs = await Blog.find({ email: req.user.email })
        .sort({ createdAt: -1 });
  
      res.status(200).json({ success: true, data: blogs });
    } catch (error) {
      console.error('GetUserBlogs Error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Error fetching blogs",
        error: error.message 
      });
    }
  };

// blogController.js
exports.createBlog = async (req, res) => {
    try {
      const { title, content } = req.body;
      
      if (!req.user?.email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      const blog = await Blog.create({
        title,
        content,
        email: req.user.email
      });
  
      res.status(201).json({ success: true, data: blog });
    } catch (error) {
      console.error('Create Blog Error:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || 'Server error' 
      });
    }
  };

// In blogController.js (updateBlog)
exports.updateBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
      
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" })
      }
      
      if (blog.email !== req.user.email) {
        return res.status(403).json({ success: false, message: "Unauthorized" })
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
  
      res.status(200).json({ success: true, data: updatedBlog })
    } catch (err) {
      console.error('Update Error:', err)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  }

  exports.deleteBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      
      if (blog.email !== req.user.email) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
      }
  
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: "Blog deleted" });
      
    } catch (error) {
      console.error('Delete Error:', error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

exports.getAllBlogs = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;

    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Blog.countDocuments();
        res.status(200).json({ success: true, data: blogs, total });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


exports.getBlogById = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, message: "Invalid blog ID" });
      }
  
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      
      res.status(200).json({ success: true, data: blog });
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Server error" 
      });
    }
  };