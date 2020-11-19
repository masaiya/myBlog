"use strict";

// 用户登录注册页面
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test', {
  useFindAndModify: false
});
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    "default": '用户001'
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    "default": Date.now
  },
  last_modified_time: {
    type: Date,
    "default": Date.now
  },
  avatar: {
    type: String,
    "default": '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    "default": '暂无个性签名'
  },
  _id: {
    type: String
  },
  gender: {
    type: Number,
    "enum": [-1, 0, 1],
    // -1为保密默认
    "default": -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    "enum": [0, 1, 2],
    // 是否可以评论， 1为不可以评论， 2为不可以登录
    "default": 0
  }
});
module.exports = mongoose.model('User', userSchema);