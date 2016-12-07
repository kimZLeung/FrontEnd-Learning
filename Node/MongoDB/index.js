var client = require('mongodb').MongoClient
var dao = require('./dao.js')

var connector = 'mongodb://localhost:23333/admin'

client.connect(connector, function(err, db) {
	console.log('连接成功')
	// dao.inser({'haha':666}, 'col', db, function(res) {
	// 	console.log(res);
	// 	dao.del({'haha':666}, 'col', db, function(res) {
	// 		console.log('1')
	// 	})
	// })
	// close(db)
	// close(db)
	if(err) {
		console.log(err)
		return false
	} else {
		dao.inser({'key':0,'haha':666}, null, db, function(res) {
			console.log(res)
			dao.update({
				oldVal:{'key':0},
				val:{'haha':888},
				db:db, 
				// callback: function(res) {
				// 	console.log(res)
				// }
			})
		})
		dao.inser({'key':1,'haha':666}, null, db, function(res) {
			console.log(res)
			dao.del({'key':1}, null, db, function(res) {
				console.log('OK!')
				dao.find({'key':0}, null, db, function(res) {
					console.log(res)
					dao.close(db)
				})
			})
		})
	}
})