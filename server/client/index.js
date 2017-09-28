const router = require('express').Router()
const controller = require('./indexController')

router.route('/')
  .get(controller.clientHome)

router.route('/schema')
  .get(controller.get)

router.route('/schema/:schema')
  .get(controller.getSchema)

  router.route('/schema/:schema/:id')
    .get(controller.getSchemaOne)

module.exports = router
