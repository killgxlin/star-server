var express = require('express');
var app = express();
var MongoStore = require('connect-mongo')(express);

app.use(express.cookieParser());
app.use(express.session({
  secret: 'keyboard cat'
//  ,store: new MongoStore({
//    db: 'session'
//  })
}));

app.use(function(req, res, next){
  var sess = req.session;
  if (sess.views) {
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.end();
    sess.views++;
    sess.reload(function(err){
      console.log(sess.views);
    });
  } else {
    sess.views = 1;
    res.end('welcome to the session demo. refresh!');
  }
});
app.listen(3000);
