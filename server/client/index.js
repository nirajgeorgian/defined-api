const router = require('express').Router()

router.route('/')
  .get((req, res, next) => {
    res.render('pages/index')
  })

router.route('/schema')
  .get((req, res, next) => {
    res.render('pages/schema')
  })

module.exports = router
