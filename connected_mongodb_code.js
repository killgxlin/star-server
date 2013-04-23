var connect = require('connect')
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , server_config = new Server('localhost', 27017, {auto_reconnect: true, native_parser: true})
  , db = new Db('test', server_config, {fsync:true})
  , mongoStore = require('connect-mongodb');

connect.createServer(
  connect.bodyParser(),
  connect.cookieParser(),
  connect.session({
    cookie: {maxAge: 60000 * 20} // 20 minutes
  , secret: 'foo'
  , store: new mongoStore({db: db})
  }),
  function(req, res, next){
    var sess = req.session;
    if (sess.views) {
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + sess.views + '</p>');
      res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
      res.end();
      sess.views++;
      console.log(sess.views);
      res.end('fin');
    } else {
      sess.views = 1;
      res.end('welcome to the session demo. refresh!');
    }
  }
).listen(3000);

