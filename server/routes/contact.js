var express = require('express');
var request = require('request');
var router = express.Router();
var sql = require('../sql/sql.js');

router.get('/updatecontact', function (req, res, next) {
  var contact = JSON.parse(req.query.contact);
  var userid=req.query.userid;
  console.log("接收到的参数是" + contact)
  sql.updateone("userskey", { "userid": parseFloat(userid) }, { $set: { "contact": contact } }, function (results) {
    if (results) {
      console.log("更新用户contact成功");
    }
    else {
      console.log("更新用户contact失败了");

    }
    res.end();
  })
});

router.get('/selectcontact', function (req, res, next) {
  var userid = req.query.userid;
console.log("userid是"+userid) 
  sql.find("userskey", { "userid": parseFloat(userid) },function (results) {
    if (results) {
      console.log("查找用户信息成功");
    }
    else {
      console.log("查找用户信息失败了");
    }
    console.log("查找到的用户信息是信息是" + results);
    results = JSON.parse(results);
    res.json({ message: results });
  })
});
module.exports = router;
