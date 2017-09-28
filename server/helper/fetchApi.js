const fetch = require('node-fetch')

exports.getJson = (url) => {
  return fetch(url)
    .then(function(response) {
      return response.json()
    })
}
