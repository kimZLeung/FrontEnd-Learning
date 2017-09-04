const loaderUtils = require("loader-utils");

module.exports = function(source) {
  this.cacheable()
  // 异步处理输出结果
  // var callback = this.async()
  // fs.readFile(headerPath, "utf-8", function(err, header) {
	// 	if(err) return callback(err);
	// 	callback(null, header + "\n" + source);
	// });
	const options = loaderUtils.getOptions(this)
	console.log('Loaders say: ' + options.haha)
  return "var kim = require('../lib/kimz.js');\n" + source + "\n\nvar k = '"+ options.haha +"';\nconsole.log(k)"
}