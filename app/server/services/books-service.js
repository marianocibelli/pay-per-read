"use strict"
import {generateDownloadLink} from '../connectors/s3-connector';
import {getEntryDataById}  from '../connectors/contentful-connector';
import {tweetTheBook} from '../connectors/twitter-connector';

export function downloadBook(req,res,next){

  let bookName = req.params.bookName;
  //Tweet it
  // tweetTheBook("",{}).then((isTweeted) => {
    // if(isTweeted){
      //Generate download link
      res.send(generateDownloadLink(bookName));
    // }else{
    //   res.status(401).send("Authorization failed")
    // }
  // });
}

export function getBookBasicData(bookName){
  //Retrieve book data from contentful
  return getEntryDataById(bookName, 'book').then((entry) => {
    return entry;
  }).catch((err) => {
    console.log(err);
    throw err;
  })
}
