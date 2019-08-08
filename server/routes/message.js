var express = require('express');
var request = require('request');
var router = express.Router();
var select = require('../sql/sql.js');

router.get('/nearmessage', function (req, res, next) {
  var location = JSON.parse(req.query.userlocation);
  var type =req.query.type;
  var whereObj=0;
  if(type=="all"){
    whereObj={"typechange":{$ne:1}}
  }
  else{
    whereObj={"typechange":type}
}
  select.findNearHelp("message", location,whereObj, function (results) {
    console.log("附近的信息是" + results);
    console.log("用户的位置是" + location.latitude);
    results = JSON.parse(results);
    res.json({ message: results })
  })

});
router.get('/allmessage', function (req, res, next) {
   var userid=JSON.parse(req.query.userid);
   select.find("message",{"userid":userid},function(results){
   
  console.log("取到的用户的所有message是"+results);
   results = JSON.parse(results);
  
 res.json({ message: results })




})


});

router.get('/cancelpublication', function (req, res, next) {
  var objectId = require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  select.deleteone("message",  { "_id": _id}, function (results) {
    if (results) {
      console.log("删除messag成功");
    }
    else {
      console.log("删除message失败了");
    }
    res.end();
  })

});

/*
router.get('/waitmessage', function (req, res, next) {
  var userid = JSON.parse(req.query.userid);

  select.find("message", {"userid":userid,"state":2}, function (results) {
    console.log("自己发布过的信息是" + results);
    results = JSON.parse(results);
    res.json({ message: results });
  })

});
router.get('/completemessage', function (req, res, next) {
  var userid = JSON.parse(req.query.userid);

  select.find("completemessage", { "userid": userid ,"pingjia":0}, function (results) {
    console.log("自己发布过的信息是" + results);
    results = JSON.parse(results);
    res.json({ message: results });
  })
});*/
router.get('/selectdostatus', function (req, res, next) {
var objectId=require('mongodb').ObjectId;  
var _id = objectId(req.query._id);
  select.find("message", { "_id": _id }, function (results) {
    results = JSON.parse(results);
    res.json({ message: results });
  })
});
//修改状态到受理中
router.get('/updatedostatus', function (req, res, next) {
  var objectId=require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  var dostatus=req.query.dostatus;
console.log("取到的状态消息是"+dostatus);
  select.updateone("message", { "_id": _id },{$set:{"dostatus":dostatus}}, function (results) {
    console.log("——id查到信息修改情况是" + results);
  })
});
//删除message
router.get('/deletemessage', function (req, res, next) {
  var objectId=require('mongodb').ObjectId;
  var _id = objectId(req.query._id);
  select.deleteone("message", { "_id": _id }, function (results) {
  })
});


module.exports = router;
