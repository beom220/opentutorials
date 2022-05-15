const fs = require('fs');
const _dir = './data';

fs.readdir(_dir, (err, file)=> console.log(file))