# 从零开始Hexo Theme的思考

标签（空格分隔）： HexoTheme Ejs

---

## Start

> 讲真一开始我以为写hexo主题贼简单。就很弱鸡。但是开始看Hexo的Workflow之后就发现事情开始比较厉害了

---

## 说一说Hexo的Workflow
> hexo的主题的话，它会读取你init出来的文件夹里根目录的`_config.yml`里面的`theme`属性。采取你`theme`文件夹下的对应名字的文件夹的主题。

### 主题本身也是文件夹
> 里面也有`_config.yml`文件用来配置这个hexo的主题.
我们使用浏览器去访问hexo搭起来的博客网页时，Hexo首先会去读取`layout.ejs`（如果模板引擎是`EJS`）
然后`layout.ejs`里面的body变量会根据我们访问的URL去对应替换这个文件里面的body的变量哦
比如我们访问的是`/`这个根路由，body就代表了`index.ejs`如果我们访问`/post`body就是`post.ejs`可以直接`<%- body %>`引入这个模板文件 

### Hexo本身有提供一些好用的变量
> 比如`page.posts`代表所有文章

### 使用Hexo Helper

    hexo.extend.helper.register(name, function(){
        // TODO
    });
    
    // 注册Hexo的Helper
    
> Helper可以让我们在模板中快速插入内容，官方有提供比如`paginator` and so on

---

## EJS
> EJS是一个模板引擎。可以允许我们在`HTML`里面写`JS的逻辑`

- `<%`这个开头的话会执行里面的JS代码，但是不会渲染到HTML里面
- `<%=`这个会执行里面的代码并且会把返回输出到HTML里面,并且被escape转义编码
- `<%-`这个和上面那个基本一样但输出的值不会被escape转码
- `<%#`这个是...注释
- `<%%`输出字面的‘<%’
- `<%>`普通的结束标签。一般都要`<% %>`这样包着
- `-%>`移除随后的换行符

## 嵌套

    <%- include('./header', {title: title}) -%>   // 第二个参数是传进去的变量，在另一个模块可以直接用。
    <h1>
      Title
    </h1>

## 用法

    var templates = ejs.compile(str, options);
    templates(data);
    
    // also can do this
    ejs.render(str, data, options)
    
    // 都是渲染HTML的字符串而已
    
    
    
---
### 感谢远成大大的[博客][1]给我很大启发


  [1]: http://lyyourc.com/2016/01/27/Write-a-Hexo-Theme-From-Strach/