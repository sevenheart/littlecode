var express = require('express');
var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var router = express.Router();
var config = require('../config');
var sql=require('../sql/sql.js');


function sha1(message) {
  return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
}

router.get('/', function (req, res, next) {

  var code = req.query.code;
  var usertouxiang =JSON.parse(req.query.userInfo);
  console.log(usertouxiang+"头像");
  request.get({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    json: true,
    qs: {
      grant_type: 'authorization_code',
      appid: config.appid,
      secret: config.secret,
      js_code: code
    }
  }, function (err, response, data) {
    if (response.statusCode === 200) {
      var useronlyid;
      var message;
      var userobj={userid:null};
      var sessionKey = data.session_key;
      var openId = data.openid;
  
      var skey = sha1(sessionKey);
      
      console.log("sanfang" + skey);
    

      sql.findcount('userskey',{"openId":openId},function(result){
        console.log("根据openid查到的值是" + result);
        if (result == 0) {
    
         console.log("正在插入用户");
        userobj = {  
          userid: parseFloat(moment().format('YYYYMMDDHHmmsssss')), 
          skey:skey,
          openId: openId,
          usertouxiang:usertouxiang,
         
          contact:{wx:"",qq:"",phonenumber:""}//联系信息
        }
  
       sql.insertone("userskey", userobj, function (result) {
          if (result) {
            message = "插入skey及创建用户id成功";
            console.log(message);
     
          }
          else {
            message = "插入skey及创建用户失败";
            console.log("插入skey及创建用户id失败");
            userobj.userid=null;
         
          }
         res.json({
           useronlyid: userobj.userid,
           message: message,
           skey: skey
         });
        });
         
      }
      else {
      
          sql.updateone("userskey", { "openId": openId }, { $set: { "skey": skey} },function(result){
          console.log("我想看的是"+result);
          if (result) {
            message="更新skey成功";
            console.log("各鸡巴"+message);
        
          }
          else {
            message = "更新ske失败";
            console.log(message);
        
          }
    
            sql.find('userskey', { "openId": openId }, function (result) {
            result=JSON.parse(result);
            userobj.userid=result[0].userid;
            console.log("根据skey查到的值是" + userobj.userid);
              res.json({
                useronlyid: userobj.userid,
                message: message,
                skey: skey
              });
            });
        });
         
        }
      
        
      });

     
      
    } else {
      res.json({
        skey: null
      });
    }
   
  });

});

module.exports = router;

