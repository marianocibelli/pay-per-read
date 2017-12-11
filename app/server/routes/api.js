const express = require('express');
const router = express.Router();
const bookService = require('../services/books-service');
const twitterService = require('../services/twitter-service');

router.get('/books/download/:bookName', function(req, res, next) {
  bookService.downloadBook(req,res,next);
});

router.get('/auth/callback', function(req, res, next) {
  twitterService.callBackAuth(req,res,next);
});

router.get('/books/:bookName', function(req, res, next) {
  bookService.getBookBasicData(req.params.bookName).then((book) => {
    res.status(200).send(book);
  }).catch(err => {
    res.status(404).send("Not Found");
  });
});

module.exports = router;
