#!/usr/bin/env node
var name = process.argv[2]
var shell = require("shelljs")

switch (name) {
	case 'new': 
		shell.mkdir(process.argv[3] || 'kim')
		break
	case 'dist':
		shell.mkdir('dist')
		shell.cd('dist/')
		shell.exec('touch dist.js')
		break
	default:
		shell.echo("hello " + name)
}

