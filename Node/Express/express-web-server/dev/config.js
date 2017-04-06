var config = {
  dev: {
    port: 8080,
    path: '/',
    publicPath: '/',
    hotMiddlewareScript: 'webpack-hot-middleware/client?reload=true',	// reload=true就是遇到不能HMR的情况就整页刷新
    hotHtmlScript: './build/dev-client'
  },
  pro: {

  }
}

module.exports = config
