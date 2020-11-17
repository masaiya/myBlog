//引包
const express=require('express');
const path=require('path');

var router = require('./router')
var bodyParser = require('body-parser');
var session = require('express-session');

//启动服务
const app=express();

//开放public目录资源
app.use('/public/',express.static(path.resolve(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.resolve(__dirname,'./node_modules/')));

//配置使用art-template 模版引擎
app.engine('html',require('express-art-template'));

// 配置body-parser解析post请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件： express-session 来解决
app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼接起来去加密,目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  // 无论你是否使用Session，都会默认给客户端分配一个Cookie钥匙
  saveUninitialized: true
}))

app.use(router);
//监听端口
app.listen(3000,function(){
console.log('Server is running...');
});
