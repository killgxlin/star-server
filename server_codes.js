var express = require('express');
var app = express();

var doc = '<form action="/" method="post" ><input type="text" name="hello" /><input type="submit" /></form>';

app.use(express.bodyParser());
app.use(express.session());

app.get('/', function(req, res){
  res.send(doc);
});

function makeRequestHandle(path, requestCallback){
  app.post(path, function(req, res){
    requestCallback(req.body, function(resJson){
      res.json(resJson);
    });
  });
}

makeRequestHandle('/', function(reqJson, responseCallback){
  require('timers').setTimeout(function(){
    responseCallback({path:'/', req:reqJson});
  }, 1000);
});

makeRequestHandle('/user', function(reqJson, responseCallback){
  responseCallback({path:'/user', req:reqJson});
});
app.listen(3000);
  

