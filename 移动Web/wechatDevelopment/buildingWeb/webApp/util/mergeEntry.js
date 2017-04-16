function mergeEntry(config, name, path) {
	console.log(path)
	config.entry[name] = path
}

module.exports.mergeEntry = mergeEntry