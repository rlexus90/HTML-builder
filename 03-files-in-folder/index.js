const fs = require('fs/promises');
const path = require('path');
const dir = path.join(__dirname, 'secret-folder');


fs.readdir(dir,
  { withFileTypes: true, },
  (err, files) => {
    if (err) throw err;
    return files
  }).then((files) => {
    files.filter(file => file.isFile()).forEach(file => {
      const way = path.join(dir, file.name)
      fs.stat(way, (err, stats) => {
        if (err) throw err;
      }).then(stats => {
        let text = file.name.split('.');
        console.log(`${text[0]} - ${text[1]} - ${stats.size / 1024}kb`);
      })
    })
  })

