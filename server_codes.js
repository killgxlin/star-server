var express = require('express');
var app = express();

var doc = '<form action="/" method="post" ><input type="text" name="hello" /><input type="submit" /></form>';
app.use(express.bodyParser());
app.get('/', function(req, res){
  res.send(doc);
});
app.post('/', function(req, res){
  console.log(req.body);
  res.end("{hahaha:1}");
});

app.listen(3000);
