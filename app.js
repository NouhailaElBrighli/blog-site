import express from 'express';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client'
import { title } from 'process';
import { brotliCompress } from 'zlib';
import { ADDRGETNETWORKPARAMS } from 'dns';
const prisma = new PrismaClient()


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.get('/create', async (req, res) =>{
	try{
		const blogs = await prisma.blogs.createMany({
			data : [ 
				{ title : "simple title", snippet : "this is a simple description", body : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat similique reiciendis tempora ipsam doloribus illum modi explicabo harum corrupti repellendus dolor unde provident magni veritatis ullam dolorum, voluptas a quibusdam dolorem quas facere? Omnis, perspiciatis incidunt! Amet, sit iste? Dolorum, porro inventore! Beatae, fugit deleniti ipsa iure accusamus vero suscipit!"},
				{ title : "second blog", snippet : "this is a snippet 2", body : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat similique reiciendis tempora ipsam doloribus illum modi explicabo harum corrupti repellendus dolor unde provident magni veritatis ullam dolorum, voluptas a quibusdam dolorem quas facere? Omnis, perspiciatis incidunt! Amet, sit iste? Dolorum, porro inventore! Beatae, fugit deleniti ipsa iure accusamus vero suscipit!" }]
		});
		const result = await prisma.blogs.findMany();
		console.log(result);
		res.json(result);
	}
	catch(error)
	{
		res.status(500).json({err : 'an error has accured', message: error.message});
	}
	finally{
		await prisma.$disconnect();
	}
});

app.use(express.static('public'));

app.use('/blog/create', express.static('public'));

app.set('view engine', 'ejs');//default path : ./views

app.use(morgan('dev'));

app.get('/', async (req, res) =>{
	const blogs = await prisma.blogs.findMany();
	res.render('home', {title : "Home", blogs});
});

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

