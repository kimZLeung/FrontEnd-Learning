const path = require('path')
const inspect = require('util').inspect
const fs = require('fs')
const Busboy = require('busboy')


// ͬ������Ŀ¼��û�и�Ŀ¼ʱ����
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

// ��ȡ�ϴ��ļ��ĺ�׺
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
		console.log('�ļ��ϴ���...')
		let result = {
			success: false,
			formData: {}
		}

		// busboy�Ĵ���
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
			let _uploadFilePath = path.join(filePath, fileName)
			let saveTo = path.join(_uploadFilePath)

			// ���浽��ӦĿ¼
			file.pipe(fs.createWriteStream(saveTo))

			// �����¼�
			file.on('end', function() {
				result.success = true
				result.message = '�ļ��ϴ��ɹ�'

				console.log('�ļ��ϴ��ɹ�')
				resolve(result)
			})
		})

		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
			console.log('������[' + fieldname + ']��value��' + inspect(val))
			result.formData[fileName] = val
		})

		busboy.on('finish', function() {
			console.log('�ļ��ϴ�����')
			resolve(result)
		})

		busboy.on('error', function(err) {
			console.log('�ļ��ϴ�����')
			reject(err)
		})

		req.pipe(busboy)
	})

}

module.exports = uploadFile
