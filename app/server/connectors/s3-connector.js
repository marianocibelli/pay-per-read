"use strict";

const AWS = require('aws-sdk')

const s3 = new AWS.S3()
const bucket = "books-repository"
//Since S3 doesnt allow to get a one time link usage we set a short expiration in seconds
const ttl = 120;

exports.generateDownloadLink = (resourceName) => {
  const url = s3.getSignedUrl('getObject', {
    Bucket: bucket,
    Key: resourceName,
    Expires: ttl
  })
  return url;
}
