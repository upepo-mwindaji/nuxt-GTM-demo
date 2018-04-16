const browser = require('./browser')
const options = require('./options')
const express = require('express')

const app = express()
app.use(express.static(__dirname + '/../../dist'));
let server

before((done) => {
  server = app.listen(4000);
  browser.setOptions(options)
  browser.setUp(done)
})

after(() => {
  browser.close()
  server.close()
});
