"use strict"

const CONTENTFUL_SPACE = process.env.CONTENTFUL_SPACE;
const CONTENTFUL_TOKEN = process.env.CONTENTFUL_TOKEN;

import {createClient} from 'contentful'
const contentfulClient = createClient({
  // Space is like a folder
  space: CONTENTFUL_SPACE,
  // This is saved on an environment variable so we dont expose our token
  accessToken: CONTENTFUL_TOKEN
})


export function getEntryDataById(id, type){
  if(!id){
    return Promise.reject();
  }
  return contentfulClient.getEntries({ content_type: type, 'fields.id': id, include: 1}).then((entry) => {
    if(entry && entry.items[0]){
      return entry.items[0].fields;
    }else{
      //Throw 404
      //TOFIX: this doesnt work
      throw new Error("not found");
    }
  }).catch((err) => {
    throw err;
  })
}
