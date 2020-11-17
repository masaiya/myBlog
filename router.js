var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
  res.render('index.html', {
    user: req.session.user
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', async function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body;
  try {
    var user = await User.findOne({
      emial: body.emial,
      password: md5(md5(body.password))
    });
    if(!user) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱或密码错误'
      })
    }
    req.session.user = user;
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch(err) {
    return res.status(500).json({
      err_code: 500,
      message: '服务器繁忙，请稍后再试！'
    });
  }
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', async function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body;
  try {
    if(await User.findOne({email: body.email})) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }
    body.password = md5(md5(body.password));

    var user = await new User(body).save();
    // 注册成功，使用 Session 记录用户的登录状态
    req.session.user = user;
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch(err) {
    return res.status(500).json({
      err_code: 500,
      message: '服务器繁忙，请稍后再试！'
    });
  }
  // 服务端重定向只对同步请求有效，对异步请求无效
})

router.get('/logout', function (req, res) {
  // 清除登录状态
  req.session.user = null;
  // 重定向到登录页
  res.redirect('/login');
})

module.exports = router;
