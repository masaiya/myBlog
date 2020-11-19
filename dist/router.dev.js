"use strict";

var express = require('express');

var User = require('./models/user');

var Topic = require('./models/topic');

var md5 = require('blueimp-md5');

var _require = require('jquery'),
    ready = _require.ready;

var router = express.Router();
router.get('/', function (req, res, next) {
  res.render('index.html', {
    user: req.session.user
  });
});
router.get('/login', function (req, res, next) {
  res.render('login.html');
});
router.post('/login', function _callee(req, res, next) {
  var body, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 1. 获取表单数据
          // 2. 查询数据库用户名密码是否正确
          // 3. 发送响应数据
          body = req.body;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            emial: body.emial,
            password: md5(md5(body.password))
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            err_code: 1,
            message: '邮箱或密码错误'
          }));

        case 7:
          req.session.user = user;
          res.status(200).json({
            err_code: 0,
            message: 'OK'
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
router.get('/register', function (req, res, next) {
  res.render('register.html');
});
router.post('/register', function _callee2(req, res, next) {
  var body, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // 1. 获取表单提交的数据
          //    req.body
          // 2. 操作数据库
          //    判断改用户是否存在
          //    如果已存在，不允许注册
          //    如果不存在，注册新建用户
          // 3. 发送响应
          body = req.body;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: body.email
          }));

        case 4:
          if (!_context2.sent) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            err_code: 1,
            message: '邮箱已存在'
          }));

        case 6:
          body.password = md5(md5(body.password));
          _context2.next = 9;
          return regeneratorRuntime.awrap(new User(body).save());

        case 9:
          user = _context2.sent;
          // 注册成功，使用 Session 记录用户的登录状态
          req.session.user = user;
          res.status(200).json({
            err_code: 0,
            message: 'OK'
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          next(_context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 14]]);
});
router.get('/logout', function (req, res) {
  // 清除登录状态
  req.session.user = null; // 重定向到登录页

  res.redirect('/login');
});
router.get('/publish', function (req, res, next) {
  res.render('publish.html', {
    user: req.session.user
  });
});
router.post('/publish', function _callee3(req, res, next) {
  var body;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // 获取表单数据
          body = req.body;

          if (!req.session.user) {
            _context3.next = 15;
            break;
          }

          body.nickname = req.session.user.nickname;
          body.email = req.session.user.email;
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(new Topic(body).save());

        case 7:
          return _context3.abrupt("return", res.status(200).json({
            err_code: 0,
            message: 'OK'
          }));

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](4);
          next(_context3.t0);

        case 13:
          _context3.next = 16;
          break;

        case 15:
          res.redirect('/login');

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 10]]);
});
module.exports = router;