const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Following the guidance from these pages:
// https://www.fastcomet.com/tutorials/nodejs/google-spreadsheet-package
// https://www.npmjs.com/package/google-spreadsheet

const GoogleSpreadsheet = require('google-spreadsheet')

const creds = {
  client_email: process.env.client_email,
  private_key: process.env.private_key
}

// This is the id from the sheet URL
var doc = new GoogleSpreadsheet('1oY4Sn933trYjjpHO9UufCXvKyLNn3TWnv8mnY4Cy1Jk')

router.post('/completion-page', function(req, res, next){

  doc.useServiceAccountAuth(creds, function (err) {

    if (err){
      console.error(err)
      return
    }

    const data = req.session.data

    const row = {
      'content-page-problems':    data['content-page-problems'],
      'content-page-more-detail': data['content-page-more-detail'],
      'form-page-problems':       data['form-page-problems'],
      'form-page-more-detail':    data['form-page-more-detail'],
      'general-1':                data['general-1'],
      'general-2':                data['general-2']
    }

    doc.addRow(1, row, function (err, row) {
      if (err){
        console.error("Error adding row to Google Sheets:")
        console.error(err)
      }
    })

  })

  next()

})

module.exports = router
