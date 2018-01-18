[在线地址](http://geasscn.me) 

### CHANGELOG
+ v 1.0 ： 正式发布的第一个版本，完成前后端的完整实现

### 运行
```
// dependencies install
npm install / yarn install
cd dva-server
npm install / yarn install

// run server
cd dva-server
npm start

// run client
npm start

// build
npm run build
```
### 界面展示
![主页](http://p1wmhg5ee.bkt.clouddn.com/main.png)
![详情](http://p1wmhg5ee.bkt.clouddn.com/56FF3551-3CE5-4B55-9380-F7D4DA748218.png)
![登陆](http://p1wmhg5ee.bkt.clouddn.com/63CC2D25-5A4C-411A-91D8-CCBF7C442603.png)
![后台](http://p1wmhg5ee.bkt.clouddn.com/592D8DB1-FF55-4504-8FAC-ABFC0C73A4BB.png)

### 功能实现
#### 博客部分
1. 文章的浏览， 搜索， 分页
2. 文章标签的分类和查询
3. 近期文章展现
4. 文章评论功能
5. 文章搜索功能
6. 错误边界处理
7. 数据参数封装
8. Live2D看板娘

#### 后台部分
1. 登陆token权限控制
2. 文章管理
3. 标签管理
4. 错误记录

### 实现技术栈
+ React 16
+ Dva 2.0
+ Koa2
+ Mysql
+ Roadhog
......

### 目录结构
```
—— blog-server：     服务器端代码（是一个单独的项目）
   —— src
      —— routes：    api路由
      —— utils：     工具类
   —— config.js：    服务端配置文件
—— mock：            mock模拟数据，早期开发用
—— public：          公共资源
—— src
   —— assets
   —— components：   封装的一系列公共组件
   —— models：       dva模型
   —— routes：       视图层
   —— services：     api 请求服务
   —— themes：       公共样式文件
   —— utils：        工具类
   —— index.js      入口程序
   —— router.js     路由
```

欢迎提ISSUE～

有什么想法可以在issue里留言或者通过博客里联系方式联系～
