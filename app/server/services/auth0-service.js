"use strict"
import {getApiToken, getUserById} from '../connectors/auth0-connector';
import jwt from 'jsonwebtoken';
import {readFileSync} from 'fs';
const userCert = readFileSync('emece.pem');

export function getTwitterIdentity(userToken){
  //TODO: implement a cron to go and get this before expiration and renew it instead of getting it every time
  return getApiToken().then((apiToken) => {
    const userBasic = jwt.verify(userToken,userCert);
    return getUserById(userBasic.sub, apiToken.access_token).then((user) => {
      const identity = user.identities.find(x => x.provider === 'twitter')
      return identity;
    });
  });
}
