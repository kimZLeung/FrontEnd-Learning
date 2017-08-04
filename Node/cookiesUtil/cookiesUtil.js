;var CookiesUtil = function() {
	// 单例返回操作cookies的方法
	return {
		get: function(name) {
			var cookiesName = encodeURIComponent(name) + '=',
					cookiesStart = document.cookies.indexOf(cookiesName)
					cookiesVal = null

			if(cookiesStart > -1) {
				var cookiesEnd = document.cookies.indexOf(';', cookiesStart)
				if(cookiesEnd == -1) {
					cookiesEnd = document.cookies.length
				}
				cookiesVal = decodeURIComponent(document.cookies.substring(cookiesStart + cookiesName.length, cookiesEnd))
				return cookiesVal
			} else {
				return null
			}
		},
		set: function(op) {
			var cookiesText = encodeURIComponent(op.name) + '=' + encodeURIComponent(op.value)

			if(op.expires instanceof Date) {
				cookiesText += '; expires=' + op.expires.toGMTString()
			}

			if(op.path) {
				cookiesText += '; path=' + op.path
			}

			if(op.domain) {
				cookiesText += '; domain=' + op.domain
			}

			if(op.secure) {
				cookiesText += '; secure'
			}

			document.cookies = cookiesText
		},
		unset: function(op) {
			this.set({
				name: op.name,
				value: '',
				expires: new Date(0),
				path: op.path,
				domain: op.domain,
				secure: op.secure
			})
		}
	}

}()

export { CookiesUtil }