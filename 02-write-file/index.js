const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const fileWay = path.join(__dirname, 'text.txt');
let text = '';

fs.writeFile(fileWay, '', (err) => {
  if (err) throw err;
  stdout.write('File created. Write text\n');
});


stdin.on('data', async (data) => {
  if (data.toString().trim() === 'exit') process.exit();
  await fs.readFile(fileWay, (err, data) => {
    if (err) throw err;
    text = data.toString();
  });
  text += data;
  fs.writeFile(fileWay, text, (err) => {
    if (err) throw err;
    stdout.write('File update. Write text, or write \'exit\' \n');
  });
});

process.on('exit', () => {
  stdout.write('Good bye!');
});

process.on('SIGINT', () => {
  process.exit();
});
