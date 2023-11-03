import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const getAllBlogs =  async(req, res) =>{
	try{
		const blogs = await prisma.blogs.findMany();
		res.render('home', {title : "Home", blogs});
	}
	catch(e){
		res.status(500).json({err : 'find many error ', message: e.message});
	}
}

const postBlog = async(req, res) =>{
	try {
		const blog = await prisma.blogs.create({
			data : req.body,
		})
		res.redirect('/blogs');
	}
	catch(e){
		res.status(500).json({err : 'create error ', message : e.message})
	}
};

const getBlogDetails = async (req, res, next) =>{
	try{
		const blog = await prisma.blogs.findUnique({
			where : {
				id: req.params.id,
			}
		});
		if (!blog)
			next();
		else
			res.render('details', {title : "Details", blog: blog});
		}
	catch(e){
		res.status(500).json({err: 'details error ', message: e.message});
	}
};

const createBlog = (req, res)=>{
	res.render('create', {title : "Create Blog"});
};

const deleteBlog = async (req, res) => {
	try{
		await prisma.blogs.delete({
			where :{
				id: req.params.id,
			}
		});
		res.json({redirect: '/blogs'})
	}
	catch(err){
		console.log(err.message);
	}
};

const exports = {
	getAllBlogs,
	postBlog,
	getBlogDetails,
	createBlog,
	deleteBlog
};

export default exports;