var express = require('express');
var ws=require('./routes/ws');
var completemessage=require('./routes/completemessage.js');
var config = require('./config');
var contact=require('./routes/contact');
var login = require('./routes/login');
var notice=require('./routes/notice');
var updatatouxiang = require('./routes/updatatouxiang');
var message = require('./routes/message.js');
var publishmessage = require('./routes/publishmessage.js');
var app = express();
var port = config.port;
var http=require('http');
var https=require('https');
var fs=require('fs');
app.get('/', function (req, res) {
 res.send('hellow word');
});

app.use('/login', login);
app.use('/message', message);
app.use('/completemessage',completemessage);

app.use('/contact',contact);
app.use('/publishmessage', publishmessage);
app.use('/updatatouxiang', updatatouxiang);
app.use('/ws',ws);
app.use('/notice',notice);
app.use(function (req, res, next) {

  res.status(404).json({
    error: '资源未找到'
  });

});

app.use(function (error, req, res, next) {

  console.log(error);
  res.status(500).json({
    error: '服务器内部错误'
  });

});
/*
app.listen(port, function (error) {
  if (error) {
    console.log('error!');
  }
  else {
    console.log("Server start! Listening on localhost:" + port);
  }
});*/
const httpsOption = {
    key : fs.readFileSync("./cert/1932899_vip666.store.key"),
    cert: fs.readFileSync("./cert/1932899_vip666.store.pem")
}

 //http.createServer(app).listen(80);
 https.createServer(httpsOption, app).listen(443);
