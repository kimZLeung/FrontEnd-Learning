function inser(val, col, db, callback) {
	col = col ? col : 'col'
	var coll = db.collection(col)
	coll.insert(val, function(err, res) {
		if(err) {
			console.log(new Error('草泥马'))
			return false
		} else {
			callback(res)
			// close(db)
		}
	})
}

function del(val, col, db, callback) {
	col = col ? col : 'col'
	var coll = db.collection(col)
	coll.remove(val, function(err, res) {
		if(err) {
			console.log(err)
			return false
		} else {
			callback(res)
		}
	})
}

function update(/*{oldVal, val, multi, col, db, callback}*/option) {
	var col = option.col ? option.col : 'col'
	var multi = option.multi ? option.multi : true
	var coll = option.db.collection(col)
	coll.update(option.oldVal, {$set: option.val}, multi, function(err, res) {
		if(err) {
			console.log(err)
			return false
		} else {
			option.callback ? option.callback(res) : console.log('haha')
		}
	})
}

function find(val, col, db, callback) {
	col = col ? col : 'col'
	var coll = db.collection(col)
	coll.find(val).toArray(function(err, res) {
		if(err) {
			console.log(err)
			return false
		} else {
			callback(res)
		}
	})
}

function close(db) {
	try {
		db.close()
		console.log('关闭数据库')
	} catch(e) {
		console.log(e)
	}	
}

exports.inser = inser
exports.del = del
exports.update = update
exports.find = find
exports.close = close