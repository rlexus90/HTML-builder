const fs = require('fs/promises');
const path = require('path');
const { createReadStream, createWriteStream } = require('fs');
const styles = path.join(__dirname, 'styles');
let dataCss = createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(styles)
	.then(files => {
		const fileCss = files.map(file => { return file.split('.') })
			.filter(el => el[1] === 'css').map(el => el.join('.'));
		fileCss.forEach(file => {
			const stream = createReadStream(path.join(styles, file))
			stream.on('data', (chunk) => {
				dataCss.write(chunk);
			});
		});
	});


