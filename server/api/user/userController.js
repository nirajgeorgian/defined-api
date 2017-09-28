const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const config = require('../../config/')

exports.post = (req, res, next) => {
  console.log(req.body);
  const data = req.body;
  MongoClient.connect(config.dbpath, function(err, db) {
    db.createCollection(data.schema, function(err, collection) {
      collection.insert({
      data
    }, {safe: true}, function(err, models) {
       if (err) return err
       res.json(models)
     })
    })
  })
  // res.json(req.body)
}

exports.getRoute = function(req, res, next) {
  const data = req.params.cname;
  if(!data) {
    res.json({
      "message": "You must specify one collection name"
    })
  } else {
    MongoClient.connect(config.dbpath, function(err, db) {
      const result = db.collection(data).find({}).toArray((err, docs) => {
        res.json(docs)
      })
    })
  }
}

exports.getID = function(req, res, next) {
  const newId = req.params.id
  const collectionName = req.params.collection
  MongoClient.connect(config.dbpath, function(err, db) {
    db.collection(collectionName).findOne({_id: new ObjectID(newId)}, function(err, docs) {
      res.json(docs)
    })
    // db.collection(collectionName).find({"address.building": "1480"}).toArray((err, docs) => {
    //   res.json(docs)
    // })
  })
}
