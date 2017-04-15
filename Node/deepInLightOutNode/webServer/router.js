var routerHandler = function() {
	var router = []
	var _use = function(path, action) {
		router.push([path, action])
	}
	var _deepUse = function(setPath, path, action) {
		for(var i = 0; i < router.length; i++) {
			var route = router[i]
			if(route[0] == setPath) {
				var array = route[3]
				if(array) {
					route[3].push([path, action])
				} else {
					route[3] = []
					route[3].push([path, action])
				}
			}
		}
		
	}

	return {
		use: function(path, action) {
			_use(path, action)
		},
		deepUse: function(setPath, path, action) {
			_deepUse(setPath, path, action)
		},
		deepScan: function(frontPath, path, req, res) {
			for(var i = 0; i < frontPath.length; i++) {
				var route = frontPath[i]
				if(path === route[0]) {
					var action = route[1]
					action(req, res)
					return
				}
			}
		},
		getChildRoute: function(pathName) {
			var pathArray = pathName.split('/')
			var setArray = pathArray.slice(2)
			return setArray.join('/')
		},
		scanRoute: function(pathName, req, res, data) {
			data ? req.param = data : ''
			for(var i = 0; i < router.length; i++) {
				var route = router[i]
				if(pathName === route[0]) {
					var action = route[1]
					action(req, res)
					return
				}
				if(pathName.indexOf(route[0]) !== -1) {
					var action = route[1]
					action(req, res)
					var setPath = this.getChildRoute(pathName)
					if(route[3]) {
						this.deepScan(route[3], setPath, req, res)
					}
				}
			}
		},
		// TODO
	}
}()

module.exports.routerHandler = routerHandler