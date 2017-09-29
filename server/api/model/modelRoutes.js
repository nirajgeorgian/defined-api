const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient
const Db = require('mongodb').Db
const Server = require('mongodb').Server
const config = require('../../config/')
const Model = require('./modelController')

router.route('/api/models')
  .get(Model.getAllModels)

router.route('/api/models/:model')
  .post(Model.postNewModel)

  module.exports = router
