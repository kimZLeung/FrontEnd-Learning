WebExtensions

---

## 浏览器扩展的开发

关于浏览器扩展的开发，其实有一定的前端基础之后，需要知道的就是一些配置项和一些`WebExtensions`的API就可以进行扩展的开发

---

## manifest.json

这是每一个扩展都必须的东西，就像每个依赖都需要`package.json`一样。

我们可以在一份`manifest.json`里面填入我们需要的配置项，这将会关系到我们后续的插件开发

example：

```
{
    "manifest_version": 2,
    "name": "yourExtension",
    "description": "a description",
    "version": "0.1",
    // 指定扩展图表在Chrome工具栏中的配置
    "browser_action": {
        "default_icon": "icon/extension.png",
        "default_title": "yourExtension",
        // 点击扩展所显示的页面
        "default_popup": "popup.html"
    },
    // 定义扩展需要向Chrome申请的权限
    "permissions": [
		"activeTab"		// 获取当前活动选项卡
    ],
    // 定义扩展启动时就自动创建一个包含所有指定JS的页面，也可以指定别的资源，主要使对应的JS常驻后台
    "background": {
    	"scripts": ["js/background.js"]
    }
}
```

[更多参考](https://developer.mozilla.org/zh-CN/Add-ons/WebExtensions/manifest.json)

---

## WebExtensions API

[点击此处](https://developer.mozilla.org/zh-CN/Add-ons/WebExtensions/API)


---

当然要看的参考

[MDN - WebExtensions](https://developer.mozilla.org/zh-CN/Add-ons/WebExtensions)
