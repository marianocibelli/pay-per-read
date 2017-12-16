import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Routes from './Routes';
import { withRouter } from 'react-router';

const App = (props) => {
  return (
    <div>
      <p> Links for testing navigation </p>
      <ul>
        <li><Link to='/books/libro-test'> LIBRO TEST</Link></li>
        <li><Link to='/books/libro-2'> LIBRO 2</Link></li>
        <li><Link to='/books/not-test'> NOT FOUND</Link></li>
      </ul>
      <Routes props={props}/>
    </div>
  )
};

export default withRouter(App);
