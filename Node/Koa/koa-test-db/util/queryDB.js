const mysql = require('mysql')

// �������ݿ����ӳ�
const pool = mysql.createPool({
  host     :  '127.0.0.1',
  user     :  'root',
  password :  'root',
  database :  'haha',
  multipleStatements: true
})


pool.on('connection', function (connection) {
  console.log('connection open')
})

pool.on('release', function (connection) {
  console.log('connection released')
})

// ��װ���ݿ��ѯ�ӿ�
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
          // �ͷŸ�����
          connection.release()
        })
      }
    })
  })
}

// ��¶���ݿ��ѯ�ӿ�
module.exports = query
