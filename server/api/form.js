const router = require('express').Router()
const cheerio = require('cheerio')
const rp = require('request-promise')
const fs = require('fs')
Promise = require('bluebird')
module.exports = router

fs.readFile('./server/api/form-html.txt','ascii', (err, file) => {
  var parsedFormInJson = {}
  const $ = cheerio.load(file)
  const formAction = $('form').attr('action')
  const formMethod = $('form').attr('method')
  const formTarget = $('form').attr('target')
  const formId = $('form').attr('id')
  // get array of list items (form elements)
  const formElements = $('div[role="listitem"]')

})


// router.post('/parse', async (req, res, next) => {

// })
