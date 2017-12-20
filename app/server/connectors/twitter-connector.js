"use strict"
import Twitter from 'twitter';



export function tweetTheBook(identity, id, name, tagline){
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: identity.access_token,
    access_token_secret: identity.access_token_secret
  });
  
  return client.post('statuses/update', {status: `I just downloaded ${name} 📖 by @auth0. ${tagline}. Check it out! https://www.urltobook.com/book/${id}`}).then( (response) => {
      return true;
  }).catch((err) => {
    console.log(err);
      return false;
  });
}
