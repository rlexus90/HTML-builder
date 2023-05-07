const { dir } = require('console');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const projectDir = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');
const styles = path.join(__dirname, 'styles');

async function createDir() {
	await fsPromises.mkdir(projectDir, { recursive: true });
};

async function coppyAssets() {
	const assetsDirs = await fsPromises.readdir(assets);
	for (let dir of assetsDirs) {
		const way = path.join(projectDir, 'assets', dir);
		const basedir = path.join(assets, dir);
		await fsPromises.mkdir(way, { recursive: true });
		const files = await fsPromises.readdir(basedir);
		files.forEach(file => {
			fsPromises.copyFile(path.join(basedir, file), path.join(way, file));
		});
	};
};

async function createCss() {
	let style = fs.createWriteStream(path.join(projectDir, 'style.css'));
	const files = await fsPromises.readdir(styles);
	files.forEach(file => {
		let read = fs.createReadStream(path.join(styles, file));
		read.on('data', (chunk) => {
			style.write(chunk);
		});
	});
};

async function createHtml() {
	let html = fs.createWriteStream(path.join(projectDir, 'index.html'));
	const files = await fsPromises.readdir(components);
	const dataObj = {};

	for (let file of files) {
		const way = path.join(components, file);
		const name = path.basename(way, '.html');
		const data = await fsPromises.readFile(way);
		dataObj[`${name}`] = data.toString();
	};

	const templete = fs.createReadStream(path.join(__dirname, 'template.html'));
	templete.on('data', chunk => {
		let data = chunk.toString();
		Object.keys(dataObj).forEach(part => {
			data = data.replace(`{{${part}}}`, dataObj[`${part}`])
		})
		html.write(data)
	})


}






createDir();
coppyAssets();
createCss();
createHtml();
