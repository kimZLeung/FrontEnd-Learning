var dev = require('./webpack.config.base.js')
var config = require('../dev/config.js')

dev.entry.app.push(config.dev.hotHtmlScript)

module.exports = dev