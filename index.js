"use strict"
const app = require('./server/')
const config = require('./server/config/')

app.listen(config.port, (err) => {
  if (err) return err
  console.log("Running on port ", config.port)
})
