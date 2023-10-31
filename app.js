import express from 'express';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


app.use(express.static('public'));

app.set('view engine', 'ejs');// the default path is ./views  
app.get('/', (req, res) =>{
	console.log(chalk.blue("responding wiht home page"));
	const blogs = [
		{title: 'greet', snippet: 'i just wanna say hello this is awesome'},
		{title: 'how are you', snippet: " How's life been treating you these days? I'm really curious to know"},
	];
	res.render('home', {title : "Home", blogs});

});;

app.get('/about', (req, res) =>{
	console.log(chalk.blue("responding with about page"));
	res.render('about', {title : "About"});
});

app.get('/blogs/create', (req, res)=>{
	console.log(chalk.yellow("responding with the create page"));
	res.render('create', {title : "Create Blog"});
});

app.use((req,res) =>{
	console.log(chalk.red("responding with 404"));
	res.status(404).render('404', {title : "page not found"});
})



app.listen(3000);