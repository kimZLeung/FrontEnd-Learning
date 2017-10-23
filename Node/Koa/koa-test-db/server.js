var Koa = require('koa')
var bodyParser = require('koa-bodyparser')
var static = require('koa-static')
var query = require('./util/queryDB.js')

var app = new Koa()
app.use(bodyParser())
app.use(static('static'))

async function operateData() {
	// let mutiply = {
	// 	sql: 'SELECT * FROM Person',
	// 	nestTables: true
	// }
	let mutiply = 'SELECT * FROM Person'
	let sql = 'SELECT money FROM ?? where author=?'
	let querySen = ['Money','ccc']
	let insert = 'INSERT INTO Person(name,age,sex,job) VALUES(?,?,?,?)'
	let insertVal = ['kim', 25, '兄dei', 'NODE']
	let insertObjSen = 'INSERT INTO Money SET ?'
	let insertObj = {
		name: 'kimz',
		money: 132,
		author: 'aqq'
	}
	let insertArr = [{
		name: 'enen',
		money: 33,
		author: 'kimz'
	}, {
		name: 've',
		money: 10000,
		author: 'ccc'
	}]
	// for(var i = 0; i < 3; i++) {
	// 	let data = await query(insertObjSen, insertArr[i])
	// }
	let data = await query(mutiply)
	return data
}

async function logData() {
	let data = await operateData()
	console.log(data)
}

logData()

app.listen(8000, () => {
	console.log('server is listening on port 8000')
})
