var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var async = require('async');
var url = require('url');

var myUrl = 'https://cnodejs.org/';
var app = express();
var ep = new eventproxy();

app.get('/', function(req, response, next) {
	superagent.get(myUrl)
	  .end(function (err, res) {
	    if (err) {
	      return console.error(err);
	    }
	    var topicUrls = [];
	    var $ = cheerio.load(res.text);
	    $('#topic_list .topic_title').each(function (idx, element) {
	      var $element = $(element);
	      var href = url.resolve(myUrl, $element.attr('href'));
	      topicUrls.push(href);
	    });

	    // var ep = new eventproxy();

	    ep.after('topic_html', topicUrls.length, function (topics) {
	      topics = topics.map(function (topicPair) {
	        var topicUrl = topicPair[0];
	        var topicHtml = topicPair[1];
	        var $ = cheerio.load(topicHtml);
	        return ({
	          title: $('.topic_full_title').text().trim(),
	          href: topicUrl,
	          comment: $('.reply_content').eq(0).text().trim(),
	        });
	      });

	      console.log('final:');
	      console.log(topics);
	      response.end(translateToHtml(topics))
	    });

	    // topicUrls.forEach(function (topicUrl) {
	    //   superagent.get(topicUrl)
	    //     .end(function (err, res) {
	    //       console.log('fetch ' + topicUrl + ' successful');
	    //       ep.emit('topic_html', [topicUrl, res.text]);
	    //     });
	    // });
	    
	    async.mapLimit(topicUrls, 5, function(href, callback) {
	    	superagent.get(href)
	    	.end(function(err, res) {
	    		ep.emit('topic_html', [href, res.text])
	    		callback()
	    	})
	    }, function() {
	    	console.log('ok')
	    })

	  });
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
				html += '<li><a style="text-decoration:none;color:black" href=' + dt.href + '><h3>' + dt.title + '</h3></a><h5>我是评论君:' + dt.comment + '</h5></li>'
			else {
				html += '<li><a style="text-decoration:none;color:black" href=' + dt.href + '><h3>' + dt.title + '</h3></a><h5>没有评论呢</h5></li>'
			}
		})
		html += '</ul>'
		return html;
	} else {
		return 'we haven\'t data'
	}
}