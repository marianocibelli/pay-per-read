import {renderToString} from 'react-dom/server';
import React from 'react';
import {matchPath, StaticRouter} from 'react-router-dom';

import routes from './routes';
import renderFullPage from '../renderFullPage';
import render404 from '../render404';
import {getBookBasicData} from '../services/books-service';
import App from '../../components/App';


//This solves the server side rendering!
export default function router(req, res){
  //check if the url match with the expected frontend routes (defined in ./routes)
  const match = routes.reduce((acc,route) => matchPath(req.url, {path: route, exact: true}) || acc, null)

  if(!match){
    //TODO: We should renderToString a 404 page instead
    res.status(404).send('Not Found');
    return;
  }

  //Extract book id from last param. Since we just have 1 match and its a /books/:id we dont have to safe check it again but in case we add more independent views we should do it
  let bookId = req.url.split('/').pop();

  return getBookBasicData(bookId).then(book => {
    const context = {};
    const html = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App book={book}/>
        </StaticRouter>
    )

    res.status(200).send(renderFullPage(html, book));
  }).catch(err => {
    const context = {};
    //TODO: We should renderToString a 404 LANDING page instead but it works for an easier testing for now.
    const html = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
    )
    res.status(404).send(render404(html));
  })
}
