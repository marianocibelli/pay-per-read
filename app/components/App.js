import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Routes from './Routes';
import { withRouter } from 'react-router';
//Its a require insted of an import because its conditional. It wont work on SSR Babel (isomorphic react) so i need to ignore it but to load it so css-loader will generate the file
if (process.env.BROWSER) {
  require("./App.css");
}

const App = (props) => {
  const search = props.location.search.substr(1);
  const params = search.split("&");
  return !params.indexOf('debug=true') ?
  (

    <div>
    <p> Links for testing navigation </p>
    <ul>
      <li><Link to='/books/an-introduction-to-ethereum-and-smart-contracts?debug=true'> LIBRO TEST</Link></li>
      <li><Link to='/books/libro-2?debug=true'> LIBRO 2</Link></li>
      <li><Link to='/books/not-test?debug=true'> NOT FOUND</Link></li>
    </ul>
      <Routes props={props}/>
    </div>
  )
  :
  (
    <div>
      <Routes props={props}/>
    </div>
  )
};

export default withRouter(App);
