var path = require('path')

module.exports = {
  port: 80,
  host: 'http://127.0.0.1',
  publicPath: '/webApp/dist',
  path: path.resolve(__dirname, 'webApp/dist'),
  apiList: ['chooseImage']
}
