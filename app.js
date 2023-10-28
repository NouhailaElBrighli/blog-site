import express from 'express';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.listen(3000);

app.get('/', (req, res) =>{
	console.log(chalk.blue("responding wiht index page"));
	res.sendFile('./docs/index.html', {root: __dirname});
});

app.get('/about.html', (req, res) =>{
	console.log(chalk.blue("responding with about page"));
	try{
		res.sendFile('./docs/about.html', {root: __dirname});
	}
	catch(e)
	{
		console.log(chalk.red(e.message));
	}
});

app.use((req,res) =>{
	console.log(chalk.red("responding with 404"));
	res.status(404).sendFile('./error/404.html', {root: __dirname})
})