const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const config = require('../../config/')

exports.post = (req, res, next) => {
  const data = req.body;
  schema = data.schema
  delete data.schema
  MongoClient.connect(config.dbpath, function(err, db) {
    db.createCollection(schema, function(err, collection) {
      collection.insert(
      data
    , {safe: true}, function(err, models) {
       if (err) return err
       res.json(models)
     })
    })
  })
}

exports.postSingleSchema = (req, res, next) => {
  const data = req.body
  delete data._id
  if(data.schema != '') {
    MongoClient.connect(config.dbpath, function(err, db) {
      console.log(data);
      db.collection(data.schema).update({"_id": new ObjectID(data.newId)}, data, {upsert: true},function(err, updated) {
        console.log(updated);
        // res.json(updated)
        // res.redirect(req.protocol + '://' + req.get('Host') + req.url)
      })
    })
  }
  res.json(data.schema)
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
