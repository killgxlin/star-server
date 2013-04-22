var express = require('express');
var app = express();
  app.use(express.cookieParser())
  .use(express.session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
  .use(function(req, res, next){
    var sess = req.session;
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + sess.views + '</p>');
      res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
      res.end();
      sess.views++;
    } else {
      sess.views = 1;
      res.end('welcome to the session demo. refresh!');
    }
  }
).listen(3000);

app.get('/', function(req, res){
  res.send('hello world');
});
