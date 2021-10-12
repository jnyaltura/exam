
const express = require('express')
var router = express.Router()
const Auth = require('../Middleware/Auth')
const ParkController = require('../Controller/Park.controller')
const bodyParser = require('body-parser');

// middleware that is specific to this router
  router.use(Auth)
  router.use(bodyParser.json());
  router.get("/parking", ParkController.getParking)
  router.post('/park', ParkController.AddParking)
  router.post('/leave', ParkController.leaveParking)
  module.exports = router