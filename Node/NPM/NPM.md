# NPM

标签（空格分隔）： npm

---

- npm init
- npm install -g (全局安装
- npm install --save(-S) ... 安装到项目目录
- npm install --save-dev(-D)
- npm install --save --save-exact (固定版本号写入dependencies
- npm install (install devDependencies
- npm script (有趣的脚本功能, 也是强大的脚本功能  [阮一峰][1]    [WhyNPMScript][2]  比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。（传参方式 -- ）
- npm shrinkwrap ...(这个命令比--save --save-exact更加彻底地固定版本号，连同依赖的依赖的版本号也一起固定)  会在当前目录下产生一个 npm-shrinkwrap.json，优先级高于package.json


  [1]: http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
  [2]: http://www.cnblogs.com/zldream1106/p/5204599.html