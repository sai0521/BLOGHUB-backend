const express = require('express');
const router = express.Router();

const {getUserBlogs ,createBlog,ubdateBlog,deleteblog } = require('../controllers/blogController');

const {register,login} = require('../controllers/userController');


router.get('/user/blogs',getUserBlogs);
router.post('/',createBlog);
router.put('/:id',ubdateBlog);
router.delete('/:id',deleteblog);


router.post('/login',login);
router.post('/register',register);

module.exports = router;