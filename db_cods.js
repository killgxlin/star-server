var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDB", function(err, db){
  if(err) { return console.dir(err); }

  var collection = db.collection('test');

  var docs = [
   {mykey:1, fieldtoupdate:1}, 
   {mykey:2, fieldtoupdate:1}, 
   {mykey:3, fieldtoupdate:1}, 
   {mykey:4, fieldtoupdate:1}, 
   {mykey:5, fieldtoupdate:1}, 
  ];
  var stream = collection.find().stream();
  stream.on("data", function(item){
    console.log(item);
  });
  stream.on("end", function(){});

  //collection.insert(docs, {w:1}, function(err, result){
  //});

  //collection.update({mykey:2}, {$set:{mykey:5}}, {w:1, multi:true}, function(err, result){
  //  console.log(err);
  //  console.log(result);
  //});

  //collection.remove({mykey:4}, {w:1}, function(err, result){
  //  console.log(err);
  //  console.log(result);
  //});
});
