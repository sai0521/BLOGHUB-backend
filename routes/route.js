const express = require('express');
const router = express.Router();

const {getBlogById,getUserBlogs ,createBlog,updateBlog,deleteBlog, getAllBlogs } = require('../controllers/blogController');
const {protect} = require('../middlewares/authMiddleware')
const {register,login} = require('../controllers/userController');


router.get('/blogs',getAllBlogs);

router.get('/auth/verify',protect,(req,res)=>{
    res.json({success:true,email:req.user.email})
})

router.get('/user/blogs',protect,getUserBlogs);
router.post('/blogs',protect,createBlog);
router.put('/blogs/:id',protect,updateBlog);
router.delete('/blogs/:id',protect,deleteBlog);
router.get('/blogs/:id',getBlogById)

router.post('/login',login);
router.post('/register',register);

module.exports = router;