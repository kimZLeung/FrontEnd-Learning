function env() {
	if(true/* false */) {
		return 'dev'
	} else {
		return 'prod'
	}
}

module.exports.env = env