#!/usr/bin/env node
var name = process.argv[2]
var shell = require("shelljs")
var git = require("simple-git")()

switch (name) {
	case 'new': 
		shell.mkdir(process.argv[3] || 'kim')
		break
	case 'dist':
		shell.mkdir('dist')
		shell.cd('dist/')
		shell.exec('touch dist.js')
		break
	case 'git': 
		git.add('.').commit(process.argv[3]).push(['origin', 'master'], function () {
			shell.echo('commit:', process.argv[3], 'success push to branch master')
		})
		break
	default:
		shell.echo("hello " + name)
}

