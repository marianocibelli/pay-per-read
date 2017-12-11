import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import BookLanding from './BookLanding'
import { withRouter } from 'react-router'

var app = function App(props) {
  const {book} = props;

  return (
    <div>
    <p> Links for testing navigation </p>
    <ul>
      <li><Link to='/books/libro-test'> LIBRO TEST</Link></li>
      <li><Link to='/books/libro-2'> LIBRO 2</Link></li>
      <li><Link to='/books/not-test'> NOT FOUND</Link></li>
    </ul>
    <Switch>
      <Route path="/books/:id" render={
        () => {
          return (
            <BookLanding book={book} />
          )
        }
      }/>
    </Switch>
    </div>
  )
};

export default withRouter(app);
