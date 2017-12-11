"use strict"
const s3Connector = require('../connectors/s3-connector');
const contentfulConnector = require('../connectors/contentful-connector');
const twitterConnector = require('../connectors/twitter-connector');

exports.downloadBook = (req,res,next) => {

  let bookName = req.params.bookName;
  //Tweet it
  // twitterConnector.tweetTheBook("",{}).then((isTweeted) => {
    // if(isTweeted){
      //Generate download link
      res.send(s3Connector.generateDownloadLink(bookName));
    // }else{
    //   res.status(401).send("Authorization failed")
    // }
  // });
}

exports.getBookBasicData = (bookName) => {
  //Retrieve book data from contentful
  return contentfulConnector.getEntryDataById(bookName, 'book').then((entry) => {
    return entry;
  }).catch((err) => {
    console.log(err);
    throw err;
  })
}
