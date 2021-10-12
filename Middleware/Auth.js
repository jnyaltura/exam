var express = require('express')
var router = express.Router()
const rateLimit = require("express-rate-limit");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  // you can insert customized auth.
  next()
})
router.use(
  rateLimit({
    windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 5,
    message: "Request exceeded",
    headers: true,
  })
)
module.exports = router;