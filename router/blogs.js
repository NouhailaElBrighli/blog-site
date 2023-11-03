import express  from "express";
import exports from '../controllers/blogsControllers.js'

const router = express.Router();


router.get('/', exports.getAllBlogs);

router.post('/', exports.postBlog);

router.get('/:id', exports.getBlogDetails);

router.get('/create', exports.createBlog);

router.delete('/:id', exports.deleteBlog);


export default router;