var express = require('express')
var request = require('request')
var router = express.Router()
var select = require('../sql/sql.js')
function checkfunction(check,cb){
  var skey=check.skey
  var checkuserid = check.checkuserid
  select.findcount("userskey", {"skey":skey,"userid":checkuserid}, function (results) {
    console.log("用户存在吗个数是" + results)
    if(results==0){
    console.log("现在进来的是0")
      cb(false)
    }
    else{
    console.log("现在进来的是1返回true")


    cb(true)
    }
})
}
module.exports = checkfunction
