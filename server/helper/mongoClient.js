const MongoClient = require('mongodb').MongoClient
const config = require('../config/')

exports.getCollection = (dbpath, collectionName) => {
  MongoClient.connect(dbpath, function(err, db) {
    const result = db.collection(collectionName).find({}).toArray((err, docs) => {
      return docs
    })
  })
}
