## Webpack输出文件分析

---

## 从打包出来的源码看如何实现模块化

看一下打包出来的文件。

```
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function 实现模块化引入的基础
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache 查看这个模块是否已经被创建并缓存
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache) 创建并缓存这个模块
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function 然后通过传入的modules数组获得所需模块，并且执行这个模块里面的JS代码，通过call传入对应参数，我们可以看到this.pxport和第二个参数（第二个参数会被传入成export，见下方）都指向了module.exports，所以我们可以在允许的情况下使用exports来导出我们需要导出的内容，像CommonJS那样用
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module 返回在模块里导出的东西
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__ webpack配置时output.publicPath配置项
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports 这个立即执行函数唯一要执行的东西，引入参数那个数组的第0项
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ (/* 各个模块都是从这里做为参数传入的，然后使用上面的__webpack_require__函数逐个按依赖引入 */[
/* 0号模块，依赖1号模块 */
/***/ (function(module, exports, __webpack_require__) {

// 通过第三个参数引入1号模块
var kim = __webpack_require__(1);
var kimz = 'haha'

console.log(kimz)
kim.kimz()

var k = 'this is kimz s loader';
console.log(k)

/***/ }),
/* 1号模块，没有依赖 */
/***/ (function(module, exports) {

module.exports = {
	kimz: function () {
		console.log('kimz')
	}
}

/***/ })
/******/ ]);
```

看着源码满心想着一个炸字...好的我们看一下简化版

```
// prettify

(function(modules) {

  // 模拟 require 语句
  function __webpack_require__() {
  }

  // 执行存放所有模块数组中的第0个模块
  __webpack_require__(0);

})([/*存放所有模块的数组*/])
```

主要的分析都在上方完整版代码的注释中，总体来说，不是在开启按需加载的情况下，`Webpack`对文件的打包出来的文件，就一个JS的立即执行函数，而各个依赖的模块会作为一个数组的形式被传入到这个执行函数的参数中，然后
通过使用了一个`__webpack_require__`的函数，来进行各个模块的按顺序加载执行。

---

## 再说说按需加载的情况

按需加载的情况和普通情况基本一样。就是多了个`webpackJsonp`函数和`__webpack_require__.e`用于加载按需加载的`Chunk`

```
  // webpackJsonp

  window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
    // 把 moreModules 添加到 modules 对象中
    // 把所有 chunkIds 对应的模块都标记成已经加载成功 
    var moduleId, chunkId, i = 0, resolves = [], result;
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (installedChunks[chunkId]) {
      	// 如果installedChunks[chunkId]不为0，则它的第0项为一个promise，是申请安装但为安装状态，在这里push进去resolves数组
        resolves.push(installedChunks[chunkId][0]);
      }
      // 如果没有已加载则将其chunkId放入installedChunks记录这个Chunk已被加载
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      // moreModules里面传入的就是按需加载进来的模块的代码，将其加入modules
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    // resolves数组里面的逐个resolve，执行异步加载成功后面的操作
    while (resolves.length) {
      resolves.shift()();
    }
  };
```


```
  // __webpack_require__.e

  __webpack_require__.e = function requireEnsure(chunkId) {
    // 获取 chunkId 对应的 Chunk 的加载状态
    var installedChunkData = installedChunks[chunkId];
    // 如果加载状态为0表示该 Chunk 已经加载成功了，直接返回 resolve Promise
    if (installedChunkData === 0) {
      return new Promise(function (resolve) {
        resolve();
      });
    }

    // installedChunkData 不为空且不为0表示该 Chunk 正在网络加载中
    if (installedChunkData) {
      // 返回存放在 installedChunkData 数组中的 Promise 对象
      return installedChunkData[2];
    }

    // installedChunkData 为空，表示该 Chunk 还没有加载过，去加载该 Chunk 对应的文件
    var promise = new Promise(function (resolve, reject) {
      installedChunkData = installedChunks[chunkId] = [resolve, reject];
    });
    installedChunkData[2] = promise;

    // 通过 DOM 操作，往 HTML head 中插入一个 script 标签去异步加载 Chunk 对应的 JavaScript 文件
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.timeout = 120000;

    // 文件的路径为配置的 publicPath、chunkId 拼接而成
    script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";

    // 设置异步加载的最长超时时间
    var timeout = setTimeout(onScriptComplete, 120000);
    script.onerror = script.onload = onScriptComplete;

    // 在 script 加载和执行完成时回调
    function onScriptComplete() {
      // 防止内存泄露
      script.onerror = script.onload = null;
      clearTimeout(timeout);

      // 去检查 chunkId 对应的 Chunk 是否安装成功，安装成功时才会存在于 installedChunks 中
      var chunk = installedChunks[chunkId];
      if (chunk !== 0) {
        if (chunk) {
          chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
        }
        installedChunks[chunkId] = undefined;
      }
    };
    head.appendChild(script);

    return promise;
  };
```


通过`webpackJsonp`和`__webpack_require__.e`的配合，因为在按需加载的情况下，当我们需要某个`Chunk`的时候，`webpack`才会帮我们加载进来，那时候`webpack`就会调用到`__webpack_require__.e`引入某个JS，然后将`installedChunk[chunksId]`定义为`[resolve, reject, promise]`的形式，然后动态生成`script`标签，载入之后通过在这个动态插入的JS文件里面调用`webpackJsonp`来把异步加载的代码放到了`modules`对象里面（就是立即执行函数传入的那个数组参数），并且resolve`__webpack_require__.e`里面的`Promise`，然后执行加载完毕的函数。这是第一次加载这个模块的情况。第二次再调用`__webpack_require__.e`载入模块的时候，因为已经载入过一次了，所以将会直接返回一个`resolve`的`Promise`对象。


我一直在怀疑，直接返回一个`resolve`的`Promise`对象，如何得到需要加载的那个模块`export`出来的东西？而`webpack`对异步加载的模块会这样加载

```
__webpack_require__.e(0).then(__webpack_require__.bind(null, 1)).then((haha) => {
    haha('Webpack');
});
```

`Promise`之后执行的操作就是对这个模块执行`__webpack_require__`，因为`modules`对象里面已经有这个模块了，然后它会返回这个模块的export，也就是`modules[1]['exports']`

