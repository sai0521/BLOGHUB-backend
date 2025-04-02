const express = require('express');
const router = express.Router();

const {getUserBlogs ,createBlog,ubdateBlog,deleteblog, getAllBlogs } = require('../controllers/blogController');
const {protect} = require('../middlewares/authMiddleware')
const {register,login} = require('../controllers/userController');


router.get('/blogs',getAllBlogs);

router.get('/user/blogs',protect,getUserBlogs);
router.post('/',protect,createBlog);
router.put('/:id',protect,updateBlog);
router.delete('/:id',protect,deleteBlog);


router.post('/login',login);
router.post('/register',register);

module.exports = router;