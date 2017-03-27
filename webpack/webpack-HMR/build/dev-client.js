var hotClient = require('webpack-hot-middleware/client')

// 订阅事件，当 event.action === 'changeHtml' 时执行页面刷新
hotClient.subscribe(function (event) {
    if (event.action === 'changeHtml') {
        window.location.reload()
    }
})