var fs = require('fs');

var fr = fs.createReadStream('./testFR.txt', 'utf-8');
var fw = fs.createWriteStream('./testFW.txt', 'utf-8');

fr.pipe(fw);
console.log('OK');