require('dotenv').config();
const express= require('express');
const app = express()
const parkRoute = require('./Routes/Park.route')
const cleanupCron = require('./Cron/Cleanup.cron')
const cron = require('node-cron');

cleanupCron(cron);
app.use("/park", parkRoute)


app.listen(process.env.PORT, ()=>{
    console.log("Listen:"+process.env.PORT+"")
});

module.exports = app;