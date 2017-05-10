var sign = require('./sign')
var ticket = require('./ticket')


function getSign(req, res) {
  if(ticket.ticket) {
    var data = sign(ticket.ticket(), req.query.url)
    var finalData = {
      signature: data.signature,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      appId: ticket.appId
    }
    var jsonData = JSON.stringify(finalData)
    res.write(jsonData)
    res.end()
  }
}

module.exports = getSign
