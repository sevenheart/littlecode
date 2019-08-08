var express = require('express');
var request = require('request');
var router = express.Router();
var sql = require('../sql/sql.js');

router.get('/', function (req, res, next) {
  var usertouxiang = JSON.parse(req.query.userInfo);
  console.log(usertouxiang);
  var userid=req.query.userid;
  console.log(userid);
  sql.updateone("userskey", { "userid": parseFloat(userid) }, { $set: { "usertouxiang":             usertouxiang } }, function (result) {
    if(result){
      console.log("更新头像信息成功");
    }
    else{
      console.log("更新头像信息失败");
    }
  })
  res.end();
});
module.exports = router;
