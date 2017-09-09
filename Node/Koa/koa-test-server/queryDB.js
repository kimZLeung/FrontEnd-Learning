const mysql = require('mysql')

// 创建数据库连接池
const pool = mysql.createPool({
  host     :  'XXX',
  user     :  'XXX',
  password :  'XXX',
  database :  'XXX'
})

// 封装数据库查询接口
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 释放该连接
          connection.release()
        })
      }
    })
  })
}

// 暴露数据库查询接口
module.exports = query