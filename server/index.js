"use strict"
const path = require('path')
const express = require('express')
const ejs = require('ejs')
// mongodb all drivers
const MongoClient = require('mongodb').MongoClient
const Db = require('mongodb').Db
const Server = require('mongodb').Server
const ObjectID = require('mongodb').ObjectID
const bodyParser = require('body-parser')
const morgan = require('morgan')

// internal includes || server includes
const config = require('./config/')
const User = require('./api/user/userRoutes')
const Model = require('./api/model/modelRoutes')

// clients includes
const Index = require('./client/index')

// express instance
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname, 'public')))

// use global database collection names
app.use(function(req, res, next) {
  MongoClient.connect(config.dbpath, function(err, db) {
    db.listCollections().toArray(function(err, collections){
      req.collections = collections;
      next();
    });
  })
})

// require routes to handle on different endpoints
app.use('/user', User)
app.use('/client', Index)
app.use('/model', Model)

module.exports = app
