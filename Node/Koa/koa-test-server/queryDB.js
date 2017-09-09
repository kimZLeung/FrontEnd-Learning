const mysql = require('mysql')

// �������ݿ����ӳ�
const pool = mysql.createPool({
  host     :  'XXX',
  user     :  'XXX',
  password :  'XXX',
  database :  'XXX'
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