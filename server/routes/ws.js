var express = require('express');
var request = require('request');
var router = express.Router();
var sql = require('../sql/sql.js');
router.get('/savemsg', function (req, res, next) {
  var msg =JSON.parse(req.query.data);
console.log("接收到的参数是"+msg)  
sql.insertone("msg", msg, function (results) {
    if (results) {
      console.log("插入小msg成功");
    }
    else {
      console.log("插入小msg失败了");
    
      }


var wherestr = JSON.parse(req.query.wherestr);
console.log("finde的条件是"+JSON.stringify(wherestr));
 sql.find("msg", wherestr , function (results) {
    if (results) {
      console.log("查找小msg成功");
    }
    else {
      console.log("查找小msg失败了");
    }
    console.log("获得的请求信息是" + results);
    results=JSON.parse(results);
    res.json({ message: results });

  })

  })

});



router.get('/selectmsg', function (req, res, next) {
  
 var wherestr = JSON.parse(req.query.wherestr);
  console.log("finde的条件是" + JSON.stringify(wherestr));
  sql.find("msg", wherestr, function (results) {
    if (results) {
      console.log("查找小msg成功");
    }
    else {
      console.log("查找小msg失败了");
    }
    console.log("获得的请求信息是" + results);
    results = JSON.parse(results);
    res.json({ message: results });

  })

});
router.get('/deletemsg', function (req, res, next) {
 
  var objectId = require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  
  sql.deleteone("msg", {"_id":_id}, function (results) {
    if (results)
   {
      console.log("删除小msg成功");
    }
    else {
      console.log("删除小msg失败了");
    }
    res.end();
  })

});
router.get('/updatemsg', function (req, res, next) {
  var objectId = require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  var status=req.query.aState;
  sql.updateone("msg", {"_id":_id},{$set:{"aState":status}}, function (results) {
    if (results)
   {
      console.log("更新小msg成功");
    }
    else {
      console.log("更新小msg失败了");
    }
    res.end();
  })

});

router.get('/selectnothandlemsg', function (req, res, next) {
  var userid = JSON.parse(req.query.userid);
  sql.findcount("msg", { "aState": 0, "id": userid }, function (results) {
    console.log("查找到的未读msg信息是" + results + "条");
    results = JSON.parse(results);
    res.json({ message: results });
  })

});module.exports = router;
