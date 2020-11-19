var express = require('express')
var User = require('./models/user')
var Topic = require('./models/topic')
var md5 = require('blueimp-md5')
const { ready } = require('jquery')

var router = express.Router()

router.get('/', async function (req, res, next) {
  try {
    var topics = await Topic.find();
    res.render('index.html', {
      user: req.session.user,
      topics: topics
    })
  } catch(err) {
    next(err);
  }
})

router.get('/login', function (req, res, next) {
  res.render('login.html')
})

router.post('/login', async function (req, res, next) {
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
    next(err)
  }
})

router.get('/register', function (req, res, next) {
  res.render('register.html')
})

router.post('/register', async function (req, res, next) {
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
    next(err)
  }
  // 服务端重定向只对同步请求有效，对异步请求无效
})

router.get('/logout', function (req, res) {
  // 清除登录状态
  req.session.user = null;
  // 重定向到登录页
  res.redirect('/login');
})

router.get('/publish', function(req, res, next) {
  res.render('publish.html', {
    user: req.session.user
  })
})

router.post('/publish', async function(req, res, next) {
  // 获取表单数据
  var body = req.body;
  if(req.session.user) {
    body.nickname = req.session.user.nickname;
    body.email = req.session.user.email;
    try {
      await new Topic(body).save();
      return res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    } catch(err) {
      next(err);
    }
  } else {
    res.redirect('/login');
  }
})

router.get('/userInfo', function(req, res, next) {
  if(req.session.user) {
    res.render('userInfo.html', {
      user: req.session.user
    })
  } else {
    res.redirect('/login');
  }
})

router.get('/editUserInfo', function(req, res, next) {
  if(req.session.user) {
    res.render('editUserInfo.html', {
      user: req.session.user
    })
  } else {
    res.redirect('/login');
  }
})

router.post('/editUserInfo', async function(req, res, next) {
  try {
    var body = req.body;
    var user = req.session.user;
    user.nickname = body.nickname;
    user.bio = body.bio;
    user.gender = body.gender;
    await User.findOneAndUpdate({
      email: user.email
    }, user);
    return res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch(err) {
    next(err);
  }
})
module.exports = router;
