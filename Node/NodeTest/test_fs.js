var fs = require('fs');

var writer = fs.createWriteStream('./testFR.txt', 'utf-8');

writer.write('balabalabala');
writer.write('in hao ni hao');
writer.end();


var reader = fs.createReadStream('./testFR.txt', 'utf-8');

reader.on('data', function(res) {
	console.log(res);
});

reader.on('end', function() {
	console.log('END');
});

reader.on('error', function(err) {
	console.log(err);
});