# 仿写 cnodejs.org 论坛项目

## 项目描述
本项目是仿写 cnodejs.org 官网，是通过 Bilibili 上 https://www.bilibili.com/video/BV1Ns411N7HU?p=120 学习的，并且在老师写的注册、登录基础上，完善了发表主题，修改资料等功能。

## 启动项目的方法
1. 安装依赖 `npm install`
2. 在项目运行的磁盘根目录下，增加文件夹 data/db(比如在D盘下添加文件夹data/db)
2. 开启 mongoDB 数据库(首先要安装mongoDB哦~)
  - `mongod`（先开启这个，不然会失败）
  - `mongo`
3. 在浏览器中输入 `localhost:3000` 或者 `127.0.0.1:3000`即可访问该项目

## 所使用技术栈

- `nodejs`
- `mongoDB`
- `Express`
- `art-template`
- `bootstrap`
- `jquery`

## 写项目步骤
- 创建目录结构
- 整合静态页-模板页
  - include
  - block
  - extend
- 设计用户登录、退出、注册的路由
- 用户注册
  - 先处理好客户端页面的内容（表单控件的name、收集表单数据、发起请求）
  - 服务端
    - 获取客户端请求的数据
    - 操作数据库(根据不同业务发送不同的响应数据)
- 用户登录
- 用户退出
- 发表话题
- 用户个人资料

## 路由设计

| 路由          | 方法 | get参数 | post参数                                 | 是否需要登录权限 | 备注                 |
| ------------- | ---- | ------- | ---------------------------------------- | ---------------- | -------------------- |
| /             | GET  |         |                                          | 否               | 渲染首页             |
| /register     | GET  |         |                                          | 否               | 渲染注册页面         |
| /register     | POST |         | email、 password                         | 否               | 处理注册请求         |
| /login        | GET  |         |                                          | 否               | 渲染登录页面         |
| /login        | POST |         | email、password                          | 否               | 处理登录请求         |
| /publish      | GET  |         |                                          | 是               | 渲染发表话题页面     |
| /publish      | POST |         | email、nickname、avatar、topic、content  | 是               | 处理发表话题请求     |
| /userInfo     | GET  |         |                                          | 是               | 渲染个人资料页面     |
| /editUserInfo | GET  |         |                                          | 是               | 渲染编辑个人资料页面 |
| /editUserInfo | POST |         | email、bio、gender、nickname、gender ... | 是               | 处理编辑个人资料请求 |
| /logout       | GET  |         |                                          | 是               |                      |



## 项目结构

```
│--app.js
│--package-lock.json
│--package.json
│--README.md
│--router.js
│
├─models
│  |--topic.js
│  |--user.js
│
├─public
│  ├─css
|    |--header.css 
│  ├─img
|    |--404.png
│    │--avatar-default.png
│    │--cnodejs_light.svg
|	 |--avatar-max-img.png
│  
|─-views
|  |--404.html
|  |--footer.html
|  |--header.html
|  |--index.html
|  |--layout.html
|  |--login.html
|  |--publish.html
|  |--register.html
|  |--userInfo.html
|  |--editUserInfo
```

