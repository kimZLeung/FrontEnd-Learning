var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy = require('eventproxy');
var url = require('url');

var app = express();
var myUrl = 'http://cnodejs.org'

app.get('/', function(req, res, next) {
	superagent.get(myUrl)
	.end(function(err, data) {
		if(err) {
			return next(err);
		}
		var $ = cheerio.load(data.text);
		var item = [];
		// var topicUrl = [];
		$('#topic_list .topic_title').each(function(index, ele) {
			var $ele = $(ele);
			item.push({
				title: $ele.attr('title'),
				href: $ele.attr('href')
			});
			// topicUrl.push(url.resolve(myUrl, $ele.attr('href')));
		});

		/**
		 * 本来是用eventproxy来控制并发
		 * 但是他那边服务器503
		 * 一直报错...
		 */
		// var ep = new eventproxy();
		// var body = [];

		// ep.after('getComment', topicUrl.length, function(topic) {
		// 	body = topic.map(function(bd) {
		// 		var tpUrl = bd.thisUrl;
		// 		var tpbody = bd.data;
		// 		var $ = cheerio.load(tpbody)

		// 		return {
		// 			title: $('.topic_full_title').text().trim(),
		// 			href: tpUrl,
		// 			comment: $('.reply_content').eq(0).text().trim()
		// 		}
		// 	})
		// 	res.send(translateToHtml(body))
		// })

		// topicUrl.forEach(function(tp) {
		// 	superagent.get(tp)
		// 	.end(function(err, res) {
		// 		if(err) {
		// 			console.log(err)
		// 		} else {
		// 			ep.emit('getComment', {
		// 				thisUrl: tp,
		// 				data: res.text
		// 			})
		// 		}
		// 	})
		// })

		res.end(translateToHtml(item));
	})
})

app.listen(8880, function() {
	console.log('server listening at port 8880')
})

function translateToHtml(data) {
	var html = '<h1 style="color:#269713;text-align:center">CNode~!</h1>'
	if(data instanceof Array) {
		html += '<ul>';
		data.map(function(dt) {
			if(dt.comment)
				html += '<li><a style="text-decoration:none;color:black" href=' + myUrl + dt.href + '><h4>' + dt.title + '</h4></a><h5>' + dt.comment + '</h5></li>'
			else {
				html += '<li><a style="text-decoration:none;color:black" href=' + myUrl + dt.href + '><h4>' + dt.title + '</h4></a><h5>' + '哈哈' + '</h5></li>'
			}
		})
		html += '</ul>'
		return html;
	} else {
		return 'we haven\'t data'
	}
}
