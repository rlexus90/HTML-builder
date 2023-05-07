const fs = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');

async function copy() {
	await fs.mkdir(copyDir, { recursive: true });
	const f = async () => {
		const copyFiles = await fs.readdir(dir);
		copyFiles.forEach((file) => {
			fs.copyFile(path.join(dir, file), path.join(copyDir, file));
		})
	};
	await f();

	const actual = async () => {
		const currentFiles = await fs.readdir(dir);
		const copyFiles = await fs.readdir(copyDir);
		const notFound = copyFiles.filter(file => {return !currentFiles.includes(file) });
		if (notFound){
			notFound.forEach(file=>{
				fs.rm(path.join(copyDir,file));
			})
		}
	}
	await actual();
	console.log('All done!')
};


copy();

