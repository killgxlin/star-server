var http = require('http');
var FormData = require('form-data');
var util = require('util');

var options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST'
};

var req = http.request(options, function(res){
  res.on('data', function(chunk){
    console.log(chunk);
  });
});


var form = new FormData();
form.append('hello', 'ÄãºÃÂð£¿');

form.pipe(req);

req.on('error', function(e){
  //console.log(e);
});
