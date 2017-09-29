const MongoClient = require('mongodb').MongoClient
const config = require('../config/')
const collection = require('../helper/mongoClient')
const helperUrl = require('../helper/fetchApi')

exports.get = function(req, res, next) {
  res.render('pages/schema', {
    collections: req.collections
  })
}

exports.getModels = (req, res, next) => {
  res.render('pages/models', {
    collections: req.collections
  })
}

exports.getSchema = (req, res, next) => {
  const SchemaName = req.params.schema
  const url = `${req.protocol}://${req.get('host')}/user/api/${SchemaName}`
  const docs = helperUrl.getJson(url)
  docs
    .then(function(data) {
      res.render('pages/schemaObject', {
        name: SchemaName,
        schemaData: data,
        collections: req.collections
      })
    })
}

exports.getSchemaOne = (req, res, next) => {
  const SchemaName = req.params.schema
  const Id = req.params.id
  const url = `${req.protocol}://${req.get('host')}/user/api/${SchemaName}/${Id}`
  const docs = helperUrl.getJson(url)
  docs
    .then(function(data) {
      res.render('pages/singleSchema', {
        name: SchemaName,
        id: Id,
        schemaData: data,
        collections: req.collections
      })
    })
}

exports.clientHome = (req, res, next) => {
  res.render('pages/index', {
    collections: req.collections
  })
}
