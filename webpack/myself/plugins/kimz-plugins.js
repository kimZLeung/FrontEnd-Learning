function kimzPlugin(options) {
	this.haha = options.haha
}

// 在它的 prototype 上定义一个 apply 方法。
kimzPlugin.prototype.apply = function(compiler) {
  var haha = this.haha
  compiler.plugin('emit', function(compilation, callback) {
    console.log("Plugin say: Bund1e Emit!!!" + haha)

    // console.log(compilation.assets)

    var filelist = 'In this build:\n\n'

    for(var filename in compilation.assets) {
    	filelist += ('- ' + filename + '\n')
    }

    console.log(filelist)

    // console.log(compilation.getStats())

    /**
     * 将这个文件加入compilation的asset对象里面
     * 可以让 webpack 帮你生成对应的文件
     * htmlWebpackPlugin也是用类似的思路生成的html
     */
    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist
      },
      size: function() {
        return filelist.length
      }
    }

    // 功能完成后调用webpack提供的回调。
    callback()
  })
}

module.exports = kimzPlugin