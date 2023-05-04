const fs = require('fs');
const path = require('path');

let data = fs.createReadStream(path.join(__dirname, path.sep, 'text.txt'), 'utf-8');

data.on('data', function (chunk) {
	console.log(chunk);
})

// Реализовал 2 варианта решения - пока разбирался узнал 2 способа.
// можна раскоментировать решение ниже и закоментировать решение выше.


// const fs = require('fs/promises');
// const path = require('path');

// fs.readFile(path.join(__dirname, path.sep, 'text.txt'), 'utf-8').then(data => {
// 	console.log(data)
// })