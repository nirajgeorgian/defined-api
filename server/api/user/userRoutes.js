const router = require('express').Router()
const MongoClient = require('mongodb').MongoClient
const Db = require('mongodb').Db
const Server = require('mongodb').Server
const config = require('../../config/')
const User = require('./userController')

router.route('/')
  .get((req, res, next) => {
    res.json({
      "success": "dodo loves here"
    })
  })
  .post(User.post)

router.route('/api/:cname')
  .get(User.getRoute)

router.route('/api/:collection/:id')
  .get(User.getID)

const createCollection = function(db, callback) {
  const data = req.body
  console.log(data);
  res.json({
    data
  })
}

module.exports = router
