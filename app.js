import express from 'express';
import chalk, { backgroundColorNames } from 'chalk';
import morgan from 'morgan';
import blogRouter  from './router/blogs.js';





const app = express();


//---------------------------------------------
app.use(express.urlencoded({extended : true }));

app.set('view engine', 'ejs');//default path : ./views

app.use(express.static('public'));

app.use('/blog/create', express.static('public'));

app.use('/blogs', express.static('public'));

app.use(morgan('dev'));

// -------------------------------------------------

app.use('/blogs' ,blogRouter);


app.get('/', async (req, res) =>{
	res.redirect('/blogs');
	
});

app.get('/about', (req, res) =>{
	res.render('about', {title : "About"});
});


app.use( (req,res) =>{
	res.status(404).render('404', {title : "page not found"});
})

app.listen(3000);

