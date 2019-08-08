var express = require('express');
var request = require('request');
var router = express.Router();
var sql = require('../sql/sql.js');
router.get('/savenotice', function (req, res, next) {
  var notice = JSON.parse(req.query.data);
  console.log("接收到的参数是" + notice)
  sql.insertone("notice", notice, function (results) {
    if (results) {
      console.log("插入notice成功");
    }
    else {
      console.log("插入notice失败了");

    }
    res.end();
  })
});


router.get('/selectnotice', function (req, res, next) {
  var wherestr = JSON.parse(req.query.wherestr);
  console.log("finde的条件是" + JSON.stringify(wherestr));
  sql.find("notice", wherestr, function (results) {
    if (results) {
      console.log("查找notice成功");
    }
    else {
      console.log("查找notice失败了");
    }
    console.log("查找到的notice信息是" + results);
    results = JSON.parse(results);
    res.json({ message: results });
  })

});
router.get('/deletenotice', function (req, res, next) {

  var objectId = require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  sql.deleteone("notice", { "_id": _id }, function (results) {
    if (results) {
      console.log("删除notice成功");
    }
    else {
      console.log("删除notice失败了");
    }
    res.end();
  })

});
router.get('/updatenoticestatus', function (req, res, next) {
  var userid = JSON.parse(req.query.id);
  sql.updateone("notice", {"id":userid }, { $set: {"read":1} }, function (results) {
    if (results) {
      console.log("更新notice为已读成功");
    }
    else {
      console.log("更新notice为已读失败了");
    }
    res.end();
  })

});

router.get('/selectnothandlenotice', function (req, res, next) {
  var userid = JSON.parse(req.query.userid);
  sql.findcount("notice", {"read":0,"id":userid}, function (results) {
    console.log("查找到的未读notice信息是" + results+"条");
    res.json({ message: results });
  })

});

module.exports = router;





