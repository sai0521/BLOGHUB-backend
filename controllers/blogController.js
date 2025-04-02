const Blog = require('../models/blog');

exports.getUserBlogs = async (req, res) => {
    const { email } = req.body
    try {
        const blogs = await Blog.find({ email }).sort({createdAt:-1});
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

exports.ubdateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({success: true,data: blog});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false,message: 'Server error'});
    }

}

exports.deleteblog = async (req,res)=>{
    try{
        const blog = await Blog.findByIdandDelete(req.params.id);
        res.status(200).json({success:true,data:{}});
    }catch(error){
        console.error(err.message);
        res.status(500).json({success: false,message: 'Server error'});
    }
}