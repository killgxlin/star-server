var http = require('http');

function makeRequest(host, port, path, body, responseCallback){
  var reqbody = JSON.stringify(body);
  var options = {
    hostname: host,
    port: port,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Content-Length' : Buffer.byteLength(reqbody, 'utf8')
    }
  };
  
  var req = http.request(options, function(res){
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      responseCallback(JSON.parse(data));
    });
  });
  req.end(reqbody);
  
  req.on('error', function(e){
    console.log(e);
  });
}

var reqJson = {hello:1234, world:9876};
makeRequest('localhost', 3000, '/', reqJson, function(resJson){
  console.log(resJson);
});
makeRequest('localhost', 3000, '/user', reqJson, function(resJson){
  console.log(resJson);
});
