const path = require('path')
const inspect = require('util').inspect
const fs = require('fs')
const Busboy = require('busboy')


// 同步创建目录，没有该目录时创建
function mkdirsSync ( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

// 获取上传文件的后缀
function getSuffixName ( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}


function uploadFile (ctx, options) {
	let req = ctx.req
	let res = ctx.res
	let busboy = new Busboy({
		headers: req.headers
	})

	let fileType = option.fileType || 'common'
	let filePath = path.join(option.filePath, fileType)
	let mkdirRes = mkdirsSync(filePath)

	return new Promise((resolve, reject) => {
		console.log('文件上传中...')
		let result = {
			success: false,
			formData: {}
		}

		// busboy的处理
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
			let _uploadFilePath = path.join(filePath, fileName)
			let saveTo = path.join(_uploadFilePath)

			// 保存到对应目录
			file.pipe(fs.createWriteStream(saveTo))

			// 结束事件
			file.on('end', function() {
				result.success = true
				result.message = '文件上传成功'

				console.log('文件上传成功')
				resolve(result)
			})
		})

		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
			console.log('表单数据[' + fieldname + ']：value：' + inspect(val))
			result.formData[fileName] = val
		})

		busboy.on('finish', function() {
			console.log('文件上传结束')
			resolve(result)
		})

		busboy.on('error', function(err) {
			console.log('文件上传出错')
			reject(err)
		})

		req.pipe(busboy)
	})

}

module.exports = uploadFile
