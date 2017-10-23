## mysql模块用法

---

## 其实没什么可说的

`query`方法第一个参数传入数据库语句，然后这个字符串可以使用`?`和`??`来标识占位符，而实际的参数可以通过第二个参数传入。这是为了避免前端传过来恶意的SQL语句所做的专义操作。第二个参数一般会传入数组，对应前面的数据库语句的`?`和`??`来一个一个填充进去数据库语句里

> 我们还可以通过`mysql.escape()`, `connection.escape()` or `pool.escape()`来把前端传过来的一些值之类的数据进行转义操作

说一下转义的规则：

[这里](https://github.com/mysqljs/mysql#escaping-query-values)


> 我们也可以通过`mysql.escapeId()`, `connection.escapeId()` or `pool.escapeId()`来转义一些`id`

- `?`和`??`有不同

`?`会把传入的字符串解析为字符串，而`??`会把传入的字符串转为**常量**。

也就是说，如果我们需要用到列名或者表名，这些值在数据库语句中通常是作为一个常量存在的，但是一些判断条件，可能会出现字符串，如下

```
SELECT Id		-- 列名
FROM Person		-- 表名
WHERE age='13'	-- 字符串
```


我们可以通过`connect.query`的返回值的`.sql`属性来查看我们最后转化出来的数据库语句
