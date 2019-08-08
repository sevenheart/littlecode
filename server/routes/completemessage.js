var express = require('express');
var request = require('request');
var router = express.Router();
var sql = require('../sql/sql.js');
router.get('/publishcompletemessage', function (req, res, next) {
  var completemessage = JSON.parse(req.query.completemessage);
  sql.insertone("completemessage", completemessage, function (result) {
    if (result) {
      console.log("插入completemessage成功");
    }
    else {
      console.log("插入completemessage失败了");
    }
    res.end();
  })

});
router.get('/selectcompletemessage', function (req, res, next) {
  var userid= JSON.parse(req.query.userid);
  sql.find("completemessage",{$or:[ {"ownerpeopleid":userid},{"sendId":userid}]}, function (result) {
   	result=JSON.parse(result);
       console.log("取到的值是completemessage"+result); 
       res.json({ message: result })
  })

});
router.get('/updateevalute', function (req, res, next) {
  var evalute= JSON.parse(req.query.evalute);
  var objectId = require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  sql.updateone("completemessage", {"_id":_id},{$set:{"evalute":evalute,status:"已评价"}}, function (results) {
   if (results)
   {
      console.log("更新评价信息成功");
    }
    else {
      console.log("更新评价信息失败了");
    }
    res.end();
  })
});

router.get('/selectnothandlecompletemessage', function (req, res, next) {
  var userid = JSON.parse(req.query.userid);
  sql.findcount("completemessage", { "ownerpeopleid": userid, "status":"未评价"}, function (result) {
    console.log("取到的值是未评价的completemessage是" + result+"条");
    res.json({ message: result })
  })

});
module.exports = router;
