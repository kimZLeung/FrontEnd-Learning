var axios = require('axios')

var appId = 'wxe1ba9237161ec4bf'
var appSecret = '8aa6867f240f54a2239988716024a4c1'
var accessToken
var ticket
var timeout

var getTicket = function(token) {
  return axios.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
    params: {
      access_token: accessToken,
      type: 'jsapi'
    }
  })
}

function getData() {
  return axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid: appId,
      secret: appSecret
    }
  }).then(function (res) {
    accessToken = res.data.access_token
    timeout = res.data.expires_in
    return getTicket(accessToken)
  }).then(function (res) {
    ticket = res.data.ticket
    console.log('ticket onload!')
  })
}

getData().then(function() {
  if(timeout) {
    setInterval(function() {
      getData()
    }, timeout * 1000)
  }
}).catch(function(err) {
  console.log(err)
})

module.exports = {
  ticket: function() {
    return ticket
  },
  appId: appId
}
