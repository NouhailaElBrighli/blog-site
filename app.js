import express from 'express';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client'
import { deleteBlogs } from './delete.js'; 


const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// deleteBlogs();


app.use(express.urlencoded({extended : true }));

app.set('view engine', 'ejs');//default path : ./views

app.use(express.static('public'));

app.use('/blog/create', express.static('public'));

app.use('/blogs', express.static('public'));

app.use(morgan('dev'));

app.get('/', async (req, res) =>{
	res.redirect('/blogs');
	
});

app.post('/blogs', async (req, res) => {
	try {
		console.log(req.body);
		const blog = await prisma.blogs.create({
			data : req.body,
		})
		res.redirect('/blogs');
	}
	catch(e){
		res.status(500).json({err : 'create error ', message : e.message})
	}
});

app.get('/blogs', async(req, res) =>{
	try{
		const blogs = await prisma.blogs.findMany();
		res.render('home', {title : "Home", blogs});
	}
	catch(e){
		res.status(500).json({err : 'find many error ', message: e.message});
	}
});

app.get('/blogs/:id', async (req, res) =>{
	try{
		const blog = await prisma.blogs.findUnique({
			where : {
				id: req.params.id,
			}
		});
		console.log(blog.body);
		res.render('details', {title : "Details", blog: blog});
	}
	catch(e){
		console.log(e.message);
		res.status(500).json({err: 'details error ', message: e.message});
	}
})

app.get('/about', (req, res) =>{
	res.render('about', {title : "About"});
});

app.get('/blog/create', (req, res)=>{
	res.render('create', {title : "Create Blog"});
});

app.use((req,res) =>{
	res.status(404).render('404', {title : "page not found"});
})

app.listen(3000);

