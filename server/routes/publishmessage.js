var express = require('express')
var request = require('request')
var router = express.Router()
var sql = require('../sql/sql.js')
var request = require('request');

var checklogin=require('./check.js')
const gcoord = require('gcoord')
router.all('*', function (req, res, next) {
   var check = JSON.parse(req.query.check)
  checklogin(check,function(result){
  if(!result) { 
    console.log("校验不合法我要return了这样发布不了")
    res.json({ check: false })
    return
  }
  next();
})
});

router.get('/publishmessage', function (req, res, next) {
  var message = JSON.parse(req.query.message)
  console.log("获取的信息时" + message.userInfo.nickName) 
  console.log("转换前的坐标是" + message.latitude,message.longitude)
  var querystr = {
  "title": message.title, 
  "typechange": message.typechange, 
  "text":message.text,
  "userid": message.userid,
  "dostatus": message.dostatus,
  "publishtime": message.publishtime,
  "userinfo": {
    "nickName": message.userInfo.nickName, "avatarUrl": message.userInfo.avatarUrl
  },
  "location":
    { "type": "Point", "coordinates": [parseFloat(message.longitude), parseFloat(message.latitude)], "address": message.mapaddress }        
  }
  var result = gcoord.transform(
    querystr.location.coordinates,   
    gcoord.GCJ02 ,               
    gcoord.WGS84                 
  )
  console.log("转换后的坐标是"+result)
  var content=querystr.text+querystr.title; 
    request.get({
              url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6f48d1819c9acbcc&secret=7eed88efd275de641e39e651f8422d9d',
              json: true,
	      method: 'GET',       
           },function (err, response, data) {
           console.log("auto是"+JSON.stringify(response));
           console.log("auto是"+JSON.stringify(response.body.access_token));
           var access_token=response.body.access_token;
            request.get({
            method: 'POST',
            json:true,
            url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+access_token+'',
            data: {
              content:  content
            }  
            },function(err,response,data){
                console.log("铭感信息成功"+JSON.stringify(response));
              if (response.body.errcode == 87014) {
                res.json({ check: false });
                console.log("是铭感信息");
                  return
              }
              else{
                 sql.insertone("message",querystr, function (result) {
                 if(result){
                   console.log("插入message成功")
                  }
                  else{
                  console.log("插入message失败了")
                  }
                  res.json({check:true})
         } )

             }
         
       
            })

           }
       )                                                                                                                                                                                        
 
 
})
module.exports = router
