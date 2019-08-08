
var that=this;
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var connStr = "mongodb://39.105.184.0:27017/";
var dbase=null;

function _connect(cb) {
  MongoClient.connect(connStr,{ useNewUrlParser: true },function (err, client) {
    if (err) {
      console.log(err);
    } else {

       db = client.db("luxu");
       dbase=client;
      cb(db);
    }
  })
}

module.exports.find = function (collection, whereObj,cb) {
  _connect(function (db) {
    db.collection(collection).find(whereObj).sort({"publishtime":-1}).toArray(function (err, results) {  
console.log("条件是"+JSON.stringify(whereObj))   
if (err){ console.log("查询出错了"); throw err;}
       results=JSON.stringify(results);
      dbase.close(); 
      cb(results);
    });
  });
}


module.exports.findNearHelp = function (collection,userlocation,whereObj,cb) {
  _connect(function (db) {
   db.collection(collection).aggregate([
      {
      $geoNear: { 
      near: { 
      type: "Point",        
    
        coordinates: [parseFloat(userlocation.longitude),parseFloat(userlocation.latitude)]
      }, 
      distanceField: "dist.calculated", 
       maxDistance: 10000, 
       query:whereObj,

      num: 100,
      spherical: true 
      }
      }]).sort({"publishtime":-1}).toArray(function (err, results) {
       
        var n=JSON.stringify(results);
        console.log("ddddddd"+n);
        dbase.close();
        cb(n);

   });
   
   
  });
}


module.exports.findcount = function (collection, whereObj,cb) {
  _connect(function (db) {
    db.collection(collection).find(whereObj).count( function(err,results) {
      console.log("查到的文档个数是" + results);
      dbase.close();
      cb(results);
    });      
  });
}

module.exports.insertone = function (collection, myobj,cb) {  
  _connect(function (db) {
    db.collection(collection).insertOne(myobj, function (err, res) {
      var result;
      if (err)  result=false;
      else {
        console.log("在sql中插入一条信息成功！");
        result = true;
      }
      dbase.close();
      cb(result);
    });

  });

}

module.exports.updateone = function (collection, whereStr, updateStr,cb) {
  _connect(function (db) {
    console.log("条件"+whereStr);
    console.log("跟新"+updateStr);
    db.collection(collection).update(whereStr,updateStr,{ multi: true }, function (err, res) {
      dbase.close();
      var result=false;
      if (err) result=false;
      else{
        console.log("在sql中更新一条信息成功！");
        result=true;
      }
      cb(result);
    });
  });
}

module.exports.deleteone = function (collection, whereObj, cb) {
  _connect(function (db) {
    db.collection(collection).deleteOne(whereObj, function (err, obj) {
      var result;
      if (err) result=false;
      else{
        console.log("文档删除成功");
        result=true;
      }
      dbase.close();
      cb(result);
    });

  });
}

module.exports.findoneone = function (collection, whereObj, cb) {
  _connect(function (db) {
    db.collection(collection).find(whereObj).map(function (doc) {
      console.log("测试结果是");
      cb(doc)
    });
  });
}


