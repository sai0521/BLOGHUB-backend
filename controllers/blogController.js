const Blog = require('../models/blog');
const mongoose = require('mongoose');

exports.getUserBlogs = async (req, res) => {
    const email = req.user.email // Get from auth middleware
    try {
        const { page = 1, limit = 10 } = req.query
        const blogs = await Blog.find({ email })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))

        const total = await Blog.countDocuments({ email })

        return res.status(200).json({
            success: true,
            data: blogs,
            total
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "error fetching blogs" });
    }
}

exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: blog });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }

}

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

exports.getAllBlogs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

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