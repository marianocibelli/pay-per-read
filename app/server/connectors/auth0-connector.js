"use strict"
import request from 'request-promise-native';

export function getApiToken(){
    const {AUTH0_CLIENT_ID, AUTH0_API_SECRET, AUTH0_API_AUDIENCE, AUTH0_DOMAIN} = process.env;
    const options = { method: 'POST',
      url: `https://${AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: {"client_id":AUTH0_CLIENT_ID,"client_secret":AUTH0_API_SECRET,"audience":AUTH0_API_AUDIENCE,"grant_type":"client_credentials"},
      json: true
    }
    return request(options).then( (response) => {
      return response;
    });
}

export function getUserById(id, token){
    const options = { method: 'GET',
      url: `${process.env.AUTH0_API_AUDIENCE}users/${id}`,
      headers: { authorization: `Bearer ${token}` },
      json: true
    };

    return request(options).then( (response) => {
      return response;
    });
}
