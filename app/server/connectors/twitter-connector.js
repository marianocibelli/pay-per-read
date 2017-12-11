"use strict"
const Twitter = require('node-twitter-api');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET
});

exports.tweetTheBook = (account, bookData) => {
  //client.post('statuses/update', {status: `I just downloaded ${bookData.name} 📖 by @auth0. ${bookData.tagline}. Check it out! https://www.urltobook.com/book/${bookData.id}`},  (error, tweet, response) => {
  return client.post('statuses/update', {status: `.`}).then( (error, tweet, response) => {
      return true;
  }).catch((err) => {
    console.log(err);
      return false;
  })

}
