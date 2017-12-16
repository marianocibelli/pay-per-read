"use strict"
import {generateDownloadLink} from '../connectors/s3-connector';
import {getEntryDataById}  from '../connectors/contentful-connector';
import {tweetTheBook} from '../connectors/twitter-connector';
import {getTwitterIdentity} from './auth0-service';

export function downloadBook(req,res,next){
  const userToken = req.body.id_token;
  const {bookId} = req.params;
  const {name,tagline} = req.query;
  req
  //TODO: implement a cron to go and get this before expiration and renew it instead of getting it every time
  getTwitterIdentity(userToken).then((identity) => {
    tweetTheBook(identity,bookId,name,tagline).then((isTweeted) => {
      if(isTweeted){
        //Generate download link
        res.send(generateDownloadLink(bookId));
      }else{
        res.status(401).send("Authorization failed")
       }
    });
  })
}

export function getBookBasicData(bookId){
  //Retrieve book data from contentful
  return getEntryDataById(bookId, 'book').then((entry) => {
    return entry;
  }).catch((err) => {
    console.log(err);
    throw err;
  })
}
