import express from 'express';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');// the default path is ./views  

app.get('/', (req, res) =>{
	console.log(chalk.blue("responding wiht index page"));
	// res.sendFile('./docs /index.html', {root: __dirname});
	res.render('home');
});

app.get('/about', (req, res) =>{
	console.log(chalk.blue("responding with about page"));
	// res.sendFile('./docs /about.html', {root: __dirname});
	res.render('about');
});

app.use((req,res) =>{
	console.log(chalk.red(req.url));
	console.log(chalk.red("responding with 404"));
	// res.status(404).sendFile('./error/404.html', {root: __dirname})
	res.render('404');
})


app.listen(3000);