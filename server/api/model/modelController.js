const MongoClient = require('mongodb').MongoClient
const Db = require('mongodb').Db
const Server = require('mongodb').Server
const config = require('../../config/')

exports.getAllModels = (req, res, next) => {
  MongoClient.connect(config.dbpath, function(err, db) {
    db.listCollections().toArray(function(err, collections){
      return res.json(collections)
    });
  })
}

exports.postNewModel = (req, res, next) => {
  const data = req.body
  MongoClient.connect(config.dbpath, function(err, db) {
    db.collection(data.modelName, function(err, origCollection) {
      origCollection.rename(data.newModelName, function(err, renamed) {
        res.json({
          "success": "renamed"
        })
      })
    })
  })
  // res.json(modelName)
}
