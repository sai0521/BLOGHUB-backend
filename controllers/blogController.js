const Blog = require('../models/blog');

exports.getUserBlogs = async (req, res) => {
    const { email } = req.body
    try {
        const blogs = await Blog.find({ email }).sort({ createdAt: -1 });
        return res.status(200).json({ data: blogs });
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
        const blog = await Blog.findByIdandDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error(err.message);
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
        res.status(200).json({success:true,data:blogs});
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}