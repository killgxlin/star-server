var express = require('express');
var app = express();

app.use(express.bodyParser());

function makeRequestHandle(path, requestCallback){
  app.post(path, function(req, res){
    requestCallback(req.body, function(resJson){
      res.json(resJson);
    });
  });
}

app.listen(3000);
makeRequestHandle('/', function(reqJson, responseCallback){
  require('timers').setTimeout(function(){
    responseCallback({path:'/', req:reqJson});
  }, 1000);
});

makeRequestHandle('/user', function(reqJson, responseCallback){
  responseCallback({path:'/user', req:reqJson});
});
  

