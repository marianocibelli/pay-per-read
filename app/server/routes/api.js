import express from 'express';
import {downloadBook , getBookBasicData} from '../services/books-service';
import {callBackAuth} from '../services/twitter-service';

const router = express.Router();

router.post('/books/download/:bookId', function(req, res, next) {
  downloadBook(req,res,next);
});

router.get('/auth/callback', (req, res, next) => {
  callBackAuth(req,res,next);
});

router.get('/books/:bookId', (req, res, next) => {
  getBookBasicData(req.params.bookId).then((book) => {
    res.status(200).send(book);
  }).catch(err => {
    res.status(404).send("Not Found");
  });
});

export default router;
