"use strict"
const twitterConnector = require('../connectors/twitter-connector');

exports.callBackAuth = (req,res,next) => {
  
  res.sendStatus(200).send("A-OK")
}
