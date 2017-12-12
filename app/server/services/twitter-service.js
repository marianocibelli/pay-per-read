"use strict"
import twitterConnector from '../connectors/twitter-connector';

export function callBackAuth(req,res,next) {

  res.sendStatus(200).send("A-OK")
}
