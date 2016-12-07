# MongoDB入门

标签（空格分隔）： node db 

---

## 入门
- 安装MongoDB
- 安装roboMongo
- MongoDB需要一个目录保存数据库的数据和打印的信息，需要自己创建，比如我`D:\MongoDBdata\db`是数据库的目录，`D:\MongoDBdata\log\mongod.log`是错误信息打印的文档
- 每次打开MongoDB服务都需要在安装目录下的bin文件夹里运行命令行。输入`mongod --dbpath... --logpath...`然后就打开了数据库的服务。
- 但是每次都这样做十分麻烦

---

## 设置自动启动MongoDB
> 过程中有许多坑...

- 先在环境变量里面设置安装路径可以在全局使用mongod命令
- 首先我们可以用`conf`文件来启动MongoDB的服务。
- 算了好烦不说这个了
- 然后可以把启动服务挂上本地服务...

`mongod -f /*conf文件路径*/ --serviceName MongoDB --install`

- 之前有使用`directoryperdb`这个参数，然后`log`打印出来的信息会有报错
- 设置这个参数的意思是表示每个db一个目录




